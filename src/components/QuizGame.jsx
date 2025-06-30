import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function QuizGame() {


  const { id } = useParams(); 
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("quizData");
    console.log("raw quizData:", raw);

    let allQuizzes = [];

    try {
      allQuizzes = JSON.parse(raw) || [];
    } catch (e) {
      console.error("Error parsing quizData:", e);
      return;
    }

    console.log("parsed quizzes:", allQuizzes);

    const index = parseInt(id);
    console.log("Index from URL:", index);

    if (!isNaN(index) && Array.isArray(allQuizzes) && allQuizzes[index]) {
      setQuizData(allQuizzes[index]);
    } else {
      console.error("❌ Quiz not found!");
      navigate("/PlayQuiz");
    }
  }, [id, navigate]);
  console.log(quizData);
  

  function handleAnswerSelection(index) {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(updatedAnswers);
  }

  function handleNext() {
    if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      localStorage.setItem("useranswers", JSON.stringify(selectedAnswers));
      localStorage.setItem("activequiz", JSON.stringify(quizData));
      navigate("/QuizResult");
    }
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#A44200] text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestionIndex];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#A44200] text-white px-4 py-10 flex items-start justify-center">
        <div className="bg-[#D58936] p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl w-full space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold">Question {currentQuestionIndex + 1}</h2>
          <p className="text-base sm:text-lg">{currentQ.question}</p>

          <div className="space-y-3">
            {currentQ.options?.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`option-${currentQuestionIndex}`}
                  checked={selectedAnswers[currentQuestionIndex] === idx}
                  onChange={() => handleAnswerSelection(idx)}
                />
                <label className="text-sm sm:text-base">{opt}</label>
              </div>
            ))}
          </div>

          <button
            className="bg-[#A44200] text-white px-4 py-2 rounded hover:bg-[#922f00] transition"
            onClick={handleNext}
          >
            {currentQuestionIndex === quizData.questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizGame;
