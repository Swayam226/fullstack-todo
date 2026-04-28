import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setcurrentTask] = useState("");

  function createTask() {
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
            onClick={createTask}
            className="w-full mb-12 p-2 border rounded-lg bg-[#d9d7d7] hover:bg-[#cac9c9] transition duration-150 ease-in"
          >
            Create Task
          </button>

          <div className="p-3 w-full bg-red-300 rounded-lg flex flex-col gap-4">
            {tasks.length === 0 ? (
              <span className="text-red-500">No Tasks Found :/</span>
            ) : (
              tasks.map((task) => {
                return (
                  <div className="p-4 w-full h-full bg-[rgb(245,245,220)] flex flex-row gap-2 justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-xl font-semibold">
                        {task.title}
                      </span>
                      {task.isCompleted ? (
                        <span className="text-green-500">Done</span>
                      ) : (
                        <span className="text-red-500 text-xs">Pending</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="border rounded-sm text-xs p-1">
                        Mark as Done
                      </button>
                      <button className="border rounded-sm text-xs p-1">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
