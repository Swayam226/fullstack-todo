import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setcurrentTask] = useState("");

  function handleClick() {
    console.log("clicked");
  }

  useEffect(() => {
    async function fetchTodos() {
      const res = await axios.get("http://localhost:3000/tasks");
      console.log(res.data);
      setTasks(res.data);
    }
    fetchTodos();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="p-4 w-full flex items-center justify-center">
        <span className="text-5xl font-medium">Taskify</span>
      </header>

      <main className="grow flex items-center justify-center pb-92">
        <div className="max-w-md w-full bg-white shadow-md border-2 hover:shadow-lg border-[#242323] rounded-xl p-8">
          <input
            type="text"
            value={currentTask}
            onChange={(e) => setcurrentTask(e.target.value)}
            l
            placeholder="Write a task"
            className="w-full mb-6 p-2 border rounded-lg"
          />
          <button
            onClick={handleClick}
            className="w-full mb-12 p-2 border rounded-lg bg-[#d9d7d7] hover:bg-[#cac9c9] transition duration-150 ease-in"
          >
            Create Task
          </button>

          <div className="p-7 w-full bg-red-300 rounded-lg">
            {tasks.length === 0 ? (
              <span className="text-red-500">No Tasks Found :/</span>
            ) : (
              <div>helo</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
