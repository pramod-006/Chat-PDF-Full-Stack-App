from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
import os

from pdf_utils import save_pdf_file, extract_text_from_pdf
from database import SessionLocal, engine, Base
from models import Document
from qa_engine import split_text_into_chunks, build_vector_store, create_qa_chain

app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Upload endpoint (Resets DB every time)
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Step 1: Dispose previous connections
        engine.dispose()

        # Step 2: Delete old DB
        if os.path.exists("documents.db"):
            os.remove("documents.db")

        # Step 3: Recreate DB and tables
        Base.metadata.create_all(bind=engine)

        # Step 4: Extract PDF content
        file_path = save_pdf_file(file)
        pdf_text = extract_text_from_pdf(file_path)

        # Step 5: Store in DB
        db: Session = SessionLocal()
        document = Document(
            filename=file.filename,
            content=pdf_text,
            upload_date=datetime.utcnow()
        )
        db.add(document)
        db.commit()
        db.refresh(document)
        db.close()

        return {
            "message": "PDF uploaded and processed successfully.",
            "document_id": document.id,
            "filename": file.filename,
            "content_preview": pdf_text[:500]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")


# ✅ Ask endpoint
class QuestionRequest(BaseModel):
    filename: str
    question: str

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    db: Session = SessionLocal()
    document = db.query(Document).filter(Document.filename == request.filename).first()
    if not document:
        db.close()
        raise HTTPException(status_code=404, detail="Document not found. Please upload a PDF first.")

    chunks = split_text_into_chunks(document.content)
    vector_store = build_vector_store(chunks)
    qa_chain = create_qa_chain(vector_store)
    response = qa_chain.run(request.question)

    db.close()
    return {
        "question": request.question,
        "answer": response
    }
