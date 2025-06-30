import frame1 from "../assets/Frame2.jpg";
import frame2 from "../assets/Frame3.jpg";
import frame3 from "../assets/Frame4.jpg";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-red-900 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl flex flex-wrap justify-center gap-6 sm:gap-10 mt-12">
          <Link to="/MyQuizes">
            <img
              src={frame1}
              className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 rounded-lg shadow-md object-cover transition-transform hover:scale-105 duration-300"
              alt="Frame 1"
            />
          </Link>
          <Link to="/create-quiz">
            <img
              src={frame2}
              className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 rounded-lg shadow-md object-cover cursor-pointer transition-transform hover:scale-105 duration-300"
              alt="Frame 2"
            />
          </Link>
          <Link to="/PlayQuiz">
            <img
              src={frame3}
              className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 rounded-lg shadow-md object-cover transition-transform hover:scale-105 duration-300"
              alt="Frame 3"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
