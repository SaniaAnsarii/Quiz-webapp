import { useState } from "react";
import Navbar from "../Navbar";

function Mcq_single() {
  const [number, setNumber] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOptionIndex: null,
  });
  const [questions, setQuestions] = useState([]);

  function addQuestion(e) {
    e.preventDefault();
    const filledOpts = currentQuestion.options.filter((opt) => opt.trim() !== "");
    if (
      currentQuestion.question.trim().length < 10 ||
      filledOpts.length < 2 ||
      currentQuestion.correctOptionIndex === null
    ) {
      alert("Please fill all the details");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: null,
    });
    setNumber(number + 1);
  }

  function handleOptions(index, value) {
    const updated = [...currentQuestion.options];
    updated[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updated });
  }

  function saveQuiz(e) {
    e.preventDefault();

    if (title.trim().length < 5 || description.trim().length < 10) {
      alert("Please fill the title and description properly");
      return;
    }

    if (questions.length < 1) {
      alert("Please add at least one question");
      return;
    }

    const quizData = {
      title,
      description,
      questions,
    };

    let existing = JSON.parse(localStorage.getItem("quizData"));
    if (!Array.isArray(existing)) existing = [];

    existing.push(quizData);
    localStorage.setItem("quizData", JSON.stringify(existing));
    alert("Quiz saved successfully!");

    setTitle("");
    setDescription("");
    setQuestions([]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: null,
    });
    setNumber(1);
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-4 md:p-10 bg-red-900 flex items-start justify-center">
        <div className="p-4 md:p-8 bg-red-200 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            MCQ (Single Correct Answer)
          </h2>

          <form className="space-y-6">
            <div className="border-2 p-4 md:p-6 shadow border-black-100 rounded-lg">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Quiz Title"
                className="w-full mb-3 p-2 rounded border"
              />
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Add Description"
                className="w-full p-2 rounded border"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-semibold">
                Question {number}
              </label>
              <input
                type="text"
                placeholder="Enter Question"
                value={currentQuestion.question}
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                }
                className="w-full mt-2 p-2 rounded border"
              />

              {currentQuestion.options.map((option, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={option}
                    onChange={(e) => handleOptions(i, e.target.value)}
                    className="flex-1 p-2 rounded border"
                  />
                  <div className="flex gap-2">
                    {currentQuestion.options.length > 2 && (
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          const newOptions = [...currentQuestion.options];
                          newOptions.splice(i, 1);
                          setCurrentQuestion({ ...currentQuestion, options: newOptions });
                        }}
                      >
                        ❌
                      </button>
                    )}
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: [...currentQuestion.options, ""],
                        })
                      }
                    >
                      ➕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <select
              className="w-full p-2 rounded border"
              value={currentQuestion.correctOptionIndex ?? ""}
              onChange={(event) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  correctOptionIndex: parseInt(event.target.value),
                })
              }
            >
              <option value="">Select The Correct Option</option>
              {currentQuestion.options.map((option, i) => (
                <option key={i} value={i}>
                  Option {i + 1}
                </option>
              ))}
            </select>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <button
                className="bg-[#D58936] text-white px-4 py-2 rounded w-full sm:w-auto"
                onClick={addQuestion}
              >
                Add Question
              </button>
              <button
                className="bg-[#A44200] text-white px-4 py-2 rounded w-full sm:w-auto"
                onClick={saveQuiz}
              >
                Save Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Mcq_single;
