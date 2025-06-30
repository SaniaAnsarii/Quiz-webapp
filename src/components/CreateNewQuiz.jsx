import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function CreateNewQuiz() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-rose-950 via-stone-500 to-red-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-zinc-300 rounded-lg p-6 md:p-10 shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-8 text-center">
            Select Question Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Link to="/create-quiz/Mcq_single">
              <div className="bg-stone-300 rounded-lg p-4 sm:p-6 text-xl sm:text-2xl md:text-3xl font-semibold text-black shadow hover:bg-stone-400 cursor-pointer transition text-center">
                MCQ (Single right answer)
              </div>
            </Link>

            <Link to="/create-quiz/Mcq_multiple">
              <div className="bg-stone-300 rounded-lg p-4 sm:p-6 text-xl sm:text-2xl md:text-3xl font-semibold text-black shadow hover:bg-stone-400 cursor-pointer transition text-center">
                MCQ (Multiple right answers)
              </div>
            </Link>
          </div>

          <Link to="/create-quiz/Short_answer">
            <div className="flex justify-center">
              <div className="bg-stone-300 rounded-lg p-4 sm:p-6 text-xl sm:text-2xl md:text-3xl font-semibold text-black shadow hover:bg-stone-400 cursor-pointer transition text-center w-full md:w-2/3">
                Short Answer (1 or 2 words)
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreateNewQuiz;
