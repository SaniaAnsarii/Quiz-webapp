import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function QuizResult() {
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("activequiz");
    const answers = localStorage.getItem("useranswers");

    if (data && answers) {
      const parsedData = JSON.parse(data);
      const parsedAnswers = JSON.parse(answers);

      setQuizData(parsedData);
      setUserAnswers(parsedAnswers);

      let tempScore = 0;
      parsedData.questions.forEach((question, index) => {
        if (
          question.correctOptionIndex !== undefined &&
          question.correctOptionIndex === parsedAnswers[index]
        ) {
          tempScore++;
        }
        if (
          question.correctOptionIndexes &&
          Array.isArray(question.correctOptionIndexes) &&
          JSON.stringify(question.correctOptionIndexes.sort()) ===
            JSON.stringify(parsedAnswers[index].sort())
        ) {
          tempScore++;
        }
        if (
          question.answer &&
          question.answer.trim().toLowerCase() ===
            parsedAnswers[index]?.trim().toLowerCase()
        ) {
          tempScore++;
        }
      });

      setScore(tempScore);
    }
  }, []);

  if (!quizData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#3C1518]">
        <p className="text-white text-xl text-center">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#3C1518] text-white px-4 py-10 flex items-center justify-center">
        <div className="bg-[#D58936] w-full max-w-xl rounded-xl shadow-xl flex flex-col items-center justify-center text-black p-6 sm:p-10 space-y-6">
          <div className="text-3xl sm:text-5xl font-extrabold text-center">
            🎉 Congratulations!
          </div>
          <div className="text-lg sm:text-xl font-semibold text-center">
            You secured{" "}
            <span className="text-white bg-[#A44200] px-2 py-1 rounded">
              {score}
            </span>{" "}
            out of{" "}
            <span className="text-white bg-[#A44200] px-2 py-1 rounded">
              {quizData.questions.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizResult;
