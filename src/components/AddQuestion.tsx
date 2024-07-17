// AddQuestion.tsx
import React, { useState } from "react";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import "../styles/AddQuestion.css";

const AddQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "questions"), {
        Question: question,
        Options: options,
        Answer: answer,
      });
  
      // Reset form fields after successful addition
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      alert("Question added successfully!");
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  return (
    <div>
      <h2>Add New Question</h2>
      <form onSubmit={handleAddQuestion}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;
