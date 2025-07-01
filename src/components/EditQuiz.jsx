import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function EditQuiz() {
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("editQuizData");
    if (data) {
      setQuiz(JSON.parse(data));
    } else {
      alert("No quiz selected for editing!");
      navigate("/MyQuizes");
    }
  }, []);

  function handleTitleChange(e) {
    setQuiz({ ...quiz, title: e.target.value });
  }

  function handleDescriptionChange(e) {
    setQuiz({ ...quiz, description: e.target.value });
  }

  function handleQuestionChange(index, field, value) {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  function handleOptionChange(qIndex, optIndex, value) {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  function toggleMultipleCorrect(qIndex, optIndex) {
    const updatedQuestions = [...quiz.questions];
    const corrects = updatedQuestions[qIndex].correctOptionIndexes || [];
    const isAlreadyCorrect = corrects.includes(optIndex);
    updatedQuestions[qIndex].correctOptionIndexes = isAlreadyCorrect
      ? corrects.filter(i => i !== optIndex)
      : [...corrects, optIndex];
    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  function saveEditedQuiz() {
    if (!quiz.title || quiz.title.trim().length < 5) {
      alert("Quiz title must be at least 5 characters.");
      return;
    }

    const allQuestionsValid = quiz.questions.every(q => q.question.trim().length >= 10);
    if (!allQuestionsValid) {
      alert("Each question must be at least 10 characters.");
      return;
    }

    let stored = JSON.parse(localStorage.getItem("quizData")) || [];

    const updated = stored.map(q =>
      q.createdAt === quiz.createdAt ? quiz : q
    );

    localStorage.setItem("quizData", JSON.stringify(updated));
    alert("Quiz updated successfully!");
    navigate("/MyQuizes");
  }

  if (!quiz) return null;

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#A44200] px-4 py-10 flex justify-center">
        <div className="bg-[#D58936] p-6 rounded-lg shadow-lg w-full max-w-3xl text-white">
          <h2 className="text-2xl font-bold mb-4">Edit Quiz</h2>

          <input
            className="w-full mb-3 p-2 bg-white border rounded text-black"
            value={quiz.title}
            onChange={handleTitleChange}
            placeholder="Quiz Title"
          />
          <textarea
            className="w-full mb-4 p-2 bg-white border rounded text-black"
            value={quiz.description}
            onChange={handleDescriptionChange}
            rows={4}
            placeholder="Quiz Description"
          />

          {quiz.questions.map((q, index) => (
            <div key={index} className="mb-6 bg-white text-black p-4 rounded shadow">
              <label className="font-semibold">Q{index + 1}</label>
              <input
                className="w-full mt-2 mb-3 p-2 rounded border"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />

        
              {q.answer !== undefined && (
                <input
                  className="w-full mb-2 p-2 rounded border"
                  value={q.answer}
                  onChange={(e) =>
                    handleQuestionChange(index, "answer", e.target.value)
                  }
                  placeholder="Answer"
                />
              )}

      
              {Array.isArray(q.options) && (
                <>
                  {q.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      className="w-full mb-2 p-2 rounded border"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      placeholder={`Option ${optIndex + 1}`}
                    />
                  ))}

      
                  {typeof q.correctOptionIndex === "number" && (
                    <select
                      className="w-full p-2 mb-2 rounded border"
                      value={q.correctOptionIndex}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "correctOptionIndex",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="">Select Correct Option</option>
                      {q.options.map((opt, i) => (
                        <option key={i} value={i}>
                          Option {i + 1}
                        </option>
                      ))}
                    </select>
                  )}

               
                  {Array.isArray(q.correctOptionIndexes) && (
                    <div className="mb-2">
                      <p className="text-sm font-semibold">Select Correct Options</p>
                      {q.options.map((opt, i) => (
                        <label key={i} className="flex items-center gap-2 mb-1">
                          <input
                            type="checkbox"
                            checked={q.correctOptionIndexes.includes(i)}
                            onChange={() => toggleMultipleCorrect(index, i)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <button
            onClick={saveEditedQuiz}
            className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default EditQuiz;
