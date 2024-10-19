import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import MyBlogs from "./components/MyBlogs";
import WriteBlog from "./components/WriteBlog";
import BlogsPost from "./components/BlogsPost";

function App() {
  const { loggedIn } = useSelector((state) => state.user);
  return (
    <div className="relative font-Roboto h-screen flex flex-col">
      <ToastContainer
        autoClose={1000}
        pauseOnHover={false}
        closeOnClick={true}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/create" element={<WriteBlog />} />
        <Route path="/blog/:slug" element={<BlogsPost />} />
      </Routes>
    </div>
  );
}

export default App;
