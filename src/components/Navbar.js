import { Link } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
    return (
        <nav className="bg-blue-800 text-white p-4 shadow-md fixed w-full top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">ML Predictor</div>
                <div className="space-x-4 hidden md:flex">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/nn-model" className="hover:text-gray-300">NN Model</Link>
                    <Link to="/supervised" className="hover:text-gray-300">Supervised</Link>
                    <Link to="/unsupervised" className="hover:text-gray-300">Unsupervised</Link>
                </div>
                <button onClick={toggleTheme} className="p-2">
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;