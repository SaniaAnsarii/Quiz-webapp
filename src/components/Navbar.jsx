import logo from '../assets/almabetter.webp';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full bg-neutral-800 px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
      <img
        className="w-48 h-12 sm:w-64 sm:h-16 object-contain mb-3 sm:mb-0"
        src={logo}
        alt="Logo"
      />
      <div className="flex flex-col sm:flex-row sm:space-x-10 text-white text-lg sm:text-2xl font-extrabold items-center gap-2">
        <Link to="/" className="hover:text-yellow-300 transition">
          <div>Home</div>
        </Link>
        <Link to="/MyQuizes" className="hover:text-yellow-300 transition">
          <div>My Quizes</div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
