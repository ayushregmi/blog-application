import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const [disableSubmit, setDisableSubmit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setDisableSubmit((state) => !state);
    if (username && password && fullName && profileUrl) {
      axios
        .post("http://localhost:8080/api/register", {
          fullName,
          username,
          password,
          profileUrl,
        })
        .then((resp) => {
          toast.success("user created");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data);
        });
    } else {
      toast.error("Name, username or password cannot be empty");
    }
    setDisableSubmit((state) => !state);
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-[#1a4359] flex  px-10 rounded-3xl flex-col py-10 w-[400px]">
        <div className="text-white text-4xl mb-10">Register</div>
        <div className="flex flex-col items-center">
          <div className="relative mb-5 w-full">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="full name"
              className="pl-7 outline-none focus:shadow-xl hover:shadow-xl duration-400 transition rounded-xl h-8 font-light w-full"
            />
            <FaUser className="absolute top-2 left-2 w-3" />
          </div>
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
          <div className="relative mb-5 w-full">
            <input
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              type="text"
              placeholder="profile url"
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
            className="border w-1/2 text-white rounded py-1"
            type="submit"
            disabled={disableSubmit}
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
