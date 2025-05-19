import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NNModel from "./pages/NNModel";
import Supervised from "./pages/Supervised";
import Unsupervised from "./pages/Unsupervised";
import NNModelResults from "./pages/NNModelResults";
import SupervisedResults from "./pages/SupervisedResults";
import UnsupervisedResults from "./pages/UnsupervisedResults";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
      <Router>
        <div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"} min-h-screen`}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <div className="pt-16 container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nn-model" element={<NNModel />} />
              <Route path="/supervised" element={<Supervised />} />
              <Route path="/unsupervised" element={<Unsupervised />} />
              <Route path="/nn-model-results" element={<NNModelResults />} />
              <Route path="/supervised-results" element={<SupervisedResults />} />
              <Route path="/unsupervised-results" element={<UnsupervisedResults />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;