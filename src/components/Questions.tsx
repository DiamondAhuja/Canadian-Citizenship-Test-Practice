import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/questionService";
import { updateUserStats } from "../services/userStatsService";
import { useAuth } from "../services/authService";

interface QuestionType {
  Question: string;
  Options: string[];
  Answer: string;
}

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth(); // Custom hook to get the current user

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

  const handleOptionChange = (option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (user) {
      await updateStats();
    }
  };

  const updateStats = async () => {
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      const userAnswer = selectedOptions[index];
      const isCorrect = userAnswer === question.Answer;
      if (user) {
        await updateUserStats(user.uid, isCorrect);
      }
    }
  };

  const renderResult = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (question.Answer === selectedOptions[index]) {
        correctCount++;
      }
    });
    return (
      <div>
        <h2>Results</h2>
        <p>You got {correctCount} out of {questions.length} questions right.</p>
      </div>
    );
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (submitted) {
    return renderResult();
  }

  const question = questions[currentQuestionIndex];

  return (
    <div>
      <div key={currentQuestionIndex}>
        <h3>{question.Question}</h3>
        <ul>
          {question.Options.map((option, idx) => (
            <li key={idx}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedOptions[currentQuestionIndex] === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {currentQuestionIndex > 0 && (
        <button onClick={handlePrevious}>Previous</button>
      )}
      {currentQuestionIndex < questions.length - 1 ? (
        <button onClick={handleNext}>Next</button>
      ) : (
        <button onClick={handleSubmit}>Submit Answers</button>
      )}
    </div>
  );
};

export default Questions;
