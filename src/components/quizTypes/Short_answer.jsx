import Navbar from "../Navbar";
import React, { useState } from 'react';

function Short_answer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answer: "",
    createdAt: new Date().toISOString(),  
  status: "active", 
   
  });

  const [questions, setQuestions] = useState([]);

 function saveQuiz(e) {
  e.preventDefault();

  const questionText = currentQuestion.question.trim();
  const answerText = currentQuestion.answer.trim();

  if (title.trim().length < 5 || description.trim().length < 10) {
    alert("Fill title and description properly");
    return;
  }

  let updatedQuestions = [...questions];

  if (
    questionText.length >= 10 &&
    answerText.length > 0 &&
    answerText.length <= 20
  ) {
    updatedQuestions.push(currentQuestion);
  }

  if (updatedQuestions.length < 1) {
    alert("Please add at least one valid question");
    return;
  }

  const quizData = {
    title,
    description,
    questions: updatedQuestions,
     createdAt: new Date().toISOString(),  
    status: "active", 
  };

  let existing = JSON.parse(localStorage.getItem("quizData")) || [];
  if (!Array.isArray(existing)) existing = [];

  existing.push(quizData);
  localStorage.setItem("quizData", JSON.stringify(existing));

  alert("Quiz saved successfully!");


  setTitle("");
  setDescription("");
  setQuestions([]);
  setCurrentQuestion({ question: "", answer: "",
    createdAt: new Date().toISOString(),  
  status: "active", 
   });
  setNumber(1);
}


  function addQuestion(e) {
    e.preventDefault();

    const questionText = currentQuestion.question.trim();
    const answerText = currentQuestion.answer.trim();

    if (questionText.length < 10 || answerText.length === 0 || answerText.length > 20) {
      alert("❌ Enter a valid question (min 10 chars) and answer (1–20 chars)");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ question: "", answer: "" });
    setNumber(number + 1);
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen px-4 py-8 md:py-20 bg-red-900 flex items-start justify-center">
        <div className="p-4 md:p-8 bg-red-200 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Short Answer (one or two words)
          </h2>

          <form className="space-y-6">
      
            <div className="border-2 p-4 md:p-6 rounded shadow border-black-100">
              <input
                type="text"
                className="w-full mb-3 p-2 rounded border"
                value={title}
                placeholder="Enter Quiz Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full p-2 rounded border"
                value={description}
                placeholder="Add Description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

      
            <div className="border-2 p-4 md:p-6 rounded shadow border-black-100">
              <label className="block font-semibold mb-2">Question {number}</label>

              <input
                type="text"
                className="w-full mb-3 p-2 rounded border"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                }
                placeholder="Enter Your Question"
              />

              <input
                type="text"
                className="w-full mb-3 p-2 rounded border"
                value={currentQuestion.answer}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, answer: e.target.value })
                }
                placeholder="Enter Your Answer"
              />

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  type="button"
                  className="bg-[#D58936] text-white px-4 py-2 rounded w-full sm:w-auto"
                  onClick={addQuestion}
                >
                  Add Question
                </button>
                <button
                  type="button"
                  className="bg-[#A44200] text-white px-4 py-2 rounded w-full sm:w-auto"
                  onClick={saveQuiz}
                >
                  Save Quiz
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Short_answer;
