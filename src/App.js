// Routes
import { Routes, Route } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// Pages
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LogIn/>}/>
      </Routes>
    </div>
  );
}

export default App;
