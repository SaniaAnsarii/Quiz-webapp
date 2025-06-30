import React, { useState } from 'react';
import Navbar from "../Navbar";

function Mcq_multiple() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOptionIndexes: []
  });

  const [questions, setQuestions] = useState([]);

  function addQuestion(e) {
    e.preventDefault();

    const filledOpt = currentQuestion.options.filter(opt => opt.trim() !== "");
    if (
      currentQuestion.question.trim().length >= 10 &&
      filledOpt.length >= 2 &&
      currentQuestion.correctOptionIndexes.length >= 1
    ) {
      setQuestions([...questions, currentQuestion]);
    } else {
      alert("Fill all the details");
      return;
    }

    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndexes: []
    });

    setNumber(number + 1);
  }

  function saveQuiz(e) {
    e.preventDefault();

    if (questions.length < 2 || title.length < 5 || description.length < 10) {
      alert("At least add 2 questions and valid title/description");
      return;
    }

    const quizData = { title, description, questions };
    let existing = JSON.parse(localStorage.getItem("quizData")) || [];
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
      correctOptionIndexes: []
    });
    setNumber(1);
  }

  function handleOptionChange(i, value) {
    const updated = [...currentQuestion.options];
    updated[i] = value;
    setCurrentQuestion({ ...currentQuestion, options: updated });
  }

  function removeOption(i) {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions.splice(i, 1);

    const updatedCorrectIndexes = currentQuestion.correctOptionIndexes
      .filter(index => index !== i)
      .map(index => index > i ? index - 1 : index);

    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
      correctOptionIndexes: updatedCorrectIndexes
    });
  }

  function toggleCorrectOptions(index) {
    const alreadySelected = currentQuestion.correctOptionIndexes.includes(index);
    const updated = alreadySelected
      ? currentQuestion.correctOptionIndexes.filter(i => i !== index)
      : [...currentQuestion.correctOptionIndexes, index];

    setCurrentQuestion({ ...currentQuestion, correctOptionIndexes: updated });
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-4 md:p-10 bg-red-900 flex items-start justify-center">
        <div className="p-4 md:p-8 bg-red-200 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            MCQ (Multiple Correct Answers)
          </h2>

          <form className="space-y-6">
            <div className="border-2 p-4 md:p-6 shadow border-black-100 rounded-lg">
              <input
                type="text"
                value={title}
                placeholder="Enter Quiz Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-3 p-2 rounded border"
              />
              <textarea
                value={description}
                placeholder="Add Description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded border"
                rows={4}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold">
                Question {number}
              </label>
              <input
                type="text"
                value={currentQuestion.question}
                placeholder="Enter Question"
                onChange={(e) =>
                  setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                }
                className="w-full mt-2 p-2 rounded border"
              />

              {currentQuestion.options.map((option, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    placeholder={`Option ${i + 1}`}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="w-full p-2 rounded border"
                  />

                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={currentQuestion.correctOptionIndexes.includes(i)}
                      onChange={() => toggleCorrectOptions(i)}
                    />
                    <span className="text-sm">Correct</span>
                  </div>

                  <div className="flex gap-1">
                    {currentQuestion.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(i)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        ❌
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: [...currentQuestion.options, ""]
                        })
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              ))}
            </div>

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

export default Mcq_multiple;
