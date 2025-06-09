# 📄 PDF Q&A Web App

An intelligent web application that allows users to upload PDF files and interactively ask questions based on the document's content. Built with a FastAPI backend and a React frontend, this project leverages the ChatGroq model for natural language understanding and semantic search.

---

## 🚀 Features

- ✅ Upload and parse PDF files
- ✅ Ask questions based on the content of uploaded PDFs
- ✅ Clean and responsive UI
- ✅ Built with full-stack architecture (FastAPI + React)
- ✅ Real-time processing using advanced QA chain

---

## 🛠️ Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | React.js               |
| Backend      | FastAPI (Python)       |
| NLP Model    | ChatGroq (QA chain)    |
| Database     | SQLite (SQLAlchemy ORM)|
| Deployment   | *(Optional or provide link)* |

---

## 📂 Folder Structure

```
project-root/
│
├── backend/
│   ├── main.py               # FastAPI app
│   ├── database.py           # DB setup
│   ├── models.py             # SQLAlchemy models
│   ├── pdf_utils.py          # PDF saving and extraction
│   ├── qa_engine.py          # Text splitting, vector store, and QA chain
│   └── requirements.txt      # Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── ai-planet-logo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadForm.js
│   │   │   └── QuestionBox.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
│
├── README.md
└── demo.mp4  *(if applicable)*
```

---

## 🔧 Setup Instructions

### 📦 Backend (FastAPI)

1. **Create a virtual environment**  
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**  
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**  
   ```bash
   uvicorn main:app --reload
   ```

> Make sure `documents.db` is deleted at startup (handled in `main.py`) to avoid stale uploads.

---

### 🌐 Frontend (React)

1. **Install dependencies**  
   ```bash
   cd frontend
   npm install
   ```

2. **Start the dev server**  
   ```bash
   npm start
   ```

> The app runs at `http://localhost:3000` and communicates with the backend at `http://localhost:5000`.

---

## 🧠 How It Works

1. User uploads a PDF.
2. The backend:
   - Saves the file
   - Extracts text using `PyMuPDF`
   - Stores it in the SQLite database
3. User asks a question.
4. The backend:
   - Splits the stored document into chunks
   - Builds a vector store
   - Feeds it to the ChatGroq QA chain
   - Returns an answer based on semantic context

---

## 📌 API Reference

### `POST /upload`

**Description:** Upload a PDF and process it  
**Request:** `multipart/form-data` with key `file`  
**Response:**  
```json
{
  "message": "PDF uploaded and processed successfully.",
  "filename": "example.pdf",
  "document_id": 1,
  "content_preview": "This document contains..."
}
```

---

### `POST /ask`

**Description:** Ask a question based on the uploaded PDF  
**Request:**  
```json
{
  "filename": "example.pdf",
  "question": "What is the summary?"
}
```

**Response:**  
```json
{
  "question": "What is the summary?",
  "answer": "The document discusses..."
}
```

---

## 👨‍💻 Author

**Singana Pramod**  
 HEAD
🔗 [LinkedIn](https://linkedin.com/in/singanapramod)

🔗 [LinkedIn](https://linkedin.com/in/singanapramod)
4db3854 (Add frontend and Readme)
