import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [hasAccount, sethasAccount] = useState(false);
  const [currentUsername, setcurrentUsername] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");

  function handleClick() {
    sethasAccount(!hasAccount);
  }

  const navigate = useNavigate();

  async function signinHandler() {
    console.log("signin button was clicked");
    const res = await api.post("/auth/signin", {
      username: currentUsername,
      password: currentPassword,
    });
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    navigate("/");
  }

  async function signupHandler() {
    console.log("signup button was clicked");
    const res = await api.post("/auth/signup", {
      username: currentUsername,
      password: currentPassword,
    });
    console.log(res.data);
    sethasAccount(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex items-center justify-center pb-10">
        {hasAccount ? (
          <div className="max-w-md w-full bg-white shadow-sm border hover:shadow-md transition duration-200 ease-in border-[#242323] rounded-xl p-8">
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mb-6 p-2 border rounded-lg"
              onChange={(e) => setcurrentUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mb-16 p-2 border rounded-lg"
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
            <button
              onClick={() => signinHandler()}
              className="w-full mb-2 p-2 border rounded-lg bg-[rgb(245,245,220)] hover:hover:bg-[rgb(248,248,244)] shadow-sm transition duration-150 ease-in"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="max-w-md w-full bg-white shadow-sm border hover:shadow-md transition duration-200 ease-in border-[#242323] rounded-xl p-8">
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mb-6 p-2 border rounded-lg"
              onChange={(e) => setcurrentUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mb-16 p-2 border rounded-lg"
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
            <button
              onClick={() => signupHandler()}
              className="w-full mb-2 p-2 border rounded-lg bg-[rgb(245,245,220)] hover:hover:bg-[rgb(248,248,244)] shadow-sm transition duration-150 ease-in"
            >
              Sign Up
            </button>

            <span
              className="text-sm cursor-pointer text-gray-500 hover:text-black duration-200 transition"
              onClick={() => handleClick()}
            >
              Already have an account ? Click here
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
