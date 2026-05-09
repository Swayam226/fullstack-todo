import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [isLogged, setisLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function logCheck() {
      if (localStorage.getItem("token")) {
        setisLogged(true);
        async function fetchData() {
          const res = await api.get("/auth/me");
          setUser(res.data.username);
        }
        fetchData();
        return;
      }
    }
    logCheck();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return (
    <header className="p-4 w-full flex items-center justify-between">
      <span className="text-5xl font-medium ml-14 cursor-pointer">Taskify</span>
      {isLogged ? (
        <div className="flex gap-8 mr-14 justify-center items-center">
          <span>Welcome, {user}</span>
          <button
            onClick={() => handleLogout()}
            className="p-2 px-4 rounded-md hover:bg-gray-900 transition duration-200 bg-gray-600 text-white text-sm cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
