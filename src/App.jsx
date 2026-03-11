import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mood from "./pages/Mood";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<Mood />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
