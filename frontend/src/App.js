import React, { useState } from "react";
import Uploadform from "./components/Uploadform";
import QuestionBox from "./components/Questionbox";
import "./App.css"; // NEW central CSS file
import "./components/Uploadform.css";
import "./components/Questionbox.css";
console.log("Imported QuestionBox:", QuestionBox);
console.log("Imported UploadForm", Uploadform);
function App() {
  const [uploadedFile, setUploadedFile] = useState(null);

const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // ✅ Must match FastAPI parameter

  try {
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Upload success:", data);
    
    // ✅ Only after success, store the full file object
    setUploadedFile(file); 
  } catch (error) {
    console.error("Error uploading file:", error.message);
    alert("Failed to upload PDF. Please try again.");
  }
};



  const askQuestion = async (question) => {
  const response = await fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename: uploadedFile.name, // IMPORTANT: Send the file name
      question: question,
    }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.answer;
};


  return (
   

      <main className="app-content">
        <Uploadform
          onFileUpload={handleFileUpload}
          uploadedFileName={uploadedFile?.name}
        />
        
        <QuestionBox
            fileUploaded={uploadedFile}
            askQuestion={askQuestion}
        />
      
      </main>
    
  );
}

export default App;

