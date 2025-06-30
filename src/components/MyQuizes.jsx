import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function MyQuizes() {
  const [quiz, setQuiz] = useState([]);
  const [showQuestionsIndex, setShowQuestionsIndex] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("quizData");
    if (data) {
      setQuiz(JSON.parse(data)); // ✅ Correct: do not wrap in []
    }
  }, []);

  function deleteQuiz(index) {
    const updated = [...quiz];
    updated.splice(index, 1);
    setQuiz(updated);
    localStorage.setItem("quizData", JSON.stringify(updated));
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#3C1518] px-4 py-8 flex items-start justify-center">
        <div className="bg-[#69140E] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-5xl text-white space-y-6">
          {quiz.length === 0 ? (
            <p className="text-white text-xl text-center">You have no saved quizzes yet 🥺</p>
          ) : (
            quiz.map((ques, id) => (
              <div
                key={id}
                className="bg-[#A44200] p-4 sm:p-6 rounded-lg shadow space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-1">{ques.title}</h3>
                    <p className="mb-1 text-sm sm:text-base">{ques.description}</p>
                    <p className="text-xs sm:text-sm text-gray-200">
                      Total Questions: {Array.isArray(ques.questions) ? ques.questions.length : 0}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteQuiz(id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete Quiz
                  </button>
                </div>

                <button
                  onClick={() => setShowQuestionsIndex(showQuestionsIndex === id ? null : id)}
                  className="bg-white text-black text-sm px-4 py-1 rounded hover:bg-gray-200 transition"
                >
                  {showQuestionsIndex === id ? "Hide" : "View"} Questions
                </button>

                {showQuestionsIndex === id && (
                  <div className="mt-4 space-y-4">
                    {ques.questions?.map((q, index) => (
                      <div
                        key={index}
                        className="bg-[#D58936] text-black p-4 rounded shadow"
                      >
                        <p className="font-semibold mb-2 text-sm sm:text-base">
                          Q{index + 1}: {q.question}
                        </p>

                        {q.answer && (
                          <p className="mb-2 text-sm">
                            Answer: <span className="font-medium">{q.answer}</span>
                          </p>
                        )}

                        {Array.isArray(q.options) && q.options.length > 0 && (
                          <div>
                            <p className="mb-1 font-semibold text-sm">Options:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {q.options.map((opt, i) => (
                                <li key={i}>
                                  {opt}
                                  {(q.correctOptionIndex === i ||
                                    (Array.isArray(q.correctOptionIndexes) &&
                                      q.correctOptionIndexes.includes(i))) && (
                                    <span className="ml-2 text-green-700 font-bold">
                                      (Correct)
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyQuizes;
