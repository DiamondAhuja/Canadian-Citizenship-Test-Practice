import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/questionService";

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getQuestions() {
      try {
        const questionsList = await fetchQuestions();
        setQuestions(questionsList);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      } finally {
        setLoading(false);
      }
    }
    getQuestions();
  }, []);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.Question}</h3>
          <ul>
            {question.Options.map((option: any, idx: any) => (
              <li key={idx}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Question;
