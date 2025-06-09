import os
import shutil
import fitz #PyMuPDF
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR,exist_ok=True)

def save_pdf_file(file : UploadFile) -> str:
    """
    Save the uploaded PDF file to the local 'uploads' folder.
    Raises an error if the file is not a PDF.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Provide a vaild PDF file ")
    
    file_path = os.path.join(UPLOAD_DIR ,file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file,buffer)

    return file_path

def extract_text_from_pdf(file_path:str) ->str:

    """
    Extracts and returns text content from the given PDF file.
    Each page's text is separated by new lines.
    """
    try:
        doc = fitz.open(file_path) #Loads the PDF
        text = ""

        for page in doc:
            text += page.get_text() + "\n" #Loads text page by page


        doc.close()    
        return text.strip()
    except Exception as e:
        raise Exception(f"Failed to extract text :{e}")
        