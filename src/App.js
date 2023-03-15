import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<h1>HomePage</h1>}/>
          <Route path="/login" element={<h1>Login screen</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
