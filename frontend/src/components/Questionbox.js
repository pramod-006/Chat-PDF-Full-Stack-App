import React, { useState } from "react";
import "./Questionbox.css";

const QuestionBox = ({ fileUploaded, askQuestion }) => {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!fileUploaded) {
      setError("Please upload a PDF first.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await askQuestion(question);
      setConversations((prev) => [...prev, { question, answer: response }]);
      setQuestion("");
    } catch (err) {
      setError("Something went wrong while processing your question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {conversations.map((msg, index) => (
  <React.Fragment key={index}>
    <div className="chat-row">
      <img src="/user-icon.png" alt="User" className="chat-icon" />
      <div className="chat-text user-text">{msg.question}</div>
    </div>

    <div className="chat-row">
      <img src="/bot-icon.png" alt="Bot" className="chat-icon" />
      <div className="chat-text bot-text">{msg.answer}</div>
    </div>
  </React.Fragment>
))}
       

        {loading && <div className="loading">Processing your question...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="chat-input-section">
        <input
          type="text"
          placeholder="Send a message..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleAsk} className="send-button">
          ➤
        </button>
      </div>
    </div>
  );
};

export default QuestionBox;
