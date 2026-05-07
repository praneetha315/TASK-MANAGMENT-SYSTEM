import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post("http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <input onChange={e => setTitle(e.target.value)} />
      <button onClick={createTask}>Add Task</button>

      {tasks.map(t => (
        <div key={t._id}>
          {t.title} - {t.status}
        </div>
      ))}
    </div>
  );
}