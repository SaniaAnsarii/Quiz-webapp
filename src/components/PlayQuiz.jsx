import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function PlayQuiz() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("quizData");

    try {
      const parsed = JSON.parse(data);

      if (Array.isArray(parsed)) {
        setQuiz(parsed);
      } else if (parsed) {
        setQuiz([parsed]);
      } else {
        setQuiz([]);
      }
    } catch (e) {
      console.error("Error parsing quizData:", e);
      setQuiz([]);
    }
  }, []);

  function playQuiz(index) {
    if (!quiz || !quiz[index]) {
      alert("❌ Quiz not found");
      return;
    }

    localStorage.setItem("activequiz", JSON.stringify(quiz[index]));
    navigate(`/QuizGame/${index}`);
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#A44200] px-4 py-10 flex items-start justify-center">
        <div className="bg-[#D58936] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl text-white space-y-6">
          {quiz.length === 0 ? (
            <p className="text-white text-xl text-center">
              You have no saved quizzes yet 🥺
            </p>
          ) : (
            quiz.map((quizdata, id) => (
              <div
                key={id}
                className="bg-[#A44200] p-4 sm:p-6 rounded-lg shadow space-y-3"
              >
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold">{quizdata.title}</h3>
                  <p className="text-sm sm:text-base">{quizdata.description}</p>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Total Questions:{" "}
                    {Array.isArray(quizdata.questions) ? quizdata.questions.length : 0}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created At:{" "}
                    {quizdata.createdAt
                      ? new Date(quizdata.createdAt).toLocaleString()
                      : "Unknown"}
                  </p>
                  <p className="text-xs">
                    Status:{" "}
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                        quizdata.status === "active"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {quizdata.status || "unknown"}
                    </span>
                  </p>
                </div>

                {quizdata.status !== "inactive" ? (
                  <button
                    onClick={() => playQuiz(id)}
                    className="bg-red-600 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Play Quiz
                  </button>
                ) : (
                  <p className="text-sm text-yellow-300 italic">This quiz is inactive</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default PlayQuiz;
