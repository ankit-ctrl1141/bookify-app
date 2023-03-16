// Routes
import { Routes, Route } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// Pages
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
// Components
import MyNavBar from "./components/MyNavBar";
import ListingPage from "./pages/List";
import BookDetailPage from "./pages/BookDetail";

function App() {
  return (
    <div>
      <MyNavBar/>  
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/book/list" element={<ListingPage/>}/>
          <Route path="/book/view/:bookId" element={<BookDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
