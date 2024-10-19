import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../redux/user/UserSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [disableLogin, setDisableLogin] = useState(false);

  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const handleSubmit = () => {
    setDisableLogin((state) => !state);

    if (username && password) {
      axios
        .post("http://localhost:8080/api/login", {
          username,
          password,
        })
        .then((resp) => {
          console.log(resp);
          dispatch(login(resp.data));
          toast.success(`Welcome ${resp.data.user.username}`);
          nagivate("/");
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }

    setDisableLogin((state) => !state);
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-[#1a4359] h-2/5 flex  px-10 rounded-3xl flex-col py-10 w-[400px]">
        <div className="text-white text-4xl mb-10">Login</div>
        <div className="flex flex-col items-center">
          <div className="relative mb-5 w-full">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="pl-7 outline-none focus:shadow-xl hover:shadow-xl duration-400 transition rounded-xl h-8 font-light w-full"
            />
            <FaUser className="absolute top-2 left-2 w-3" />
          </div>
          <div className="relative mb-10 w-full">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="pl-7 outline-none focus:shadow-xl hover:shadow-xl duration-400 transition rounded-xl h-8 font-light w-full"
            />
            <FaLock className="absolute top-2 left-2 w-3" />
            <div
              className="absolute top-2 right-2 w-5"
              onClick={() => setShowPassword((state) => !state)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            className="border w-1/2 text-white rounded mb-6 py-1"
            type="submit"
            disabled={disableLogin}
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link to="/register" className="text-white border rounded px-3 py-1">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
