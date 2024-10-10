import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  name: string;
}

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const logout = (): void => {
    localStorage.removeItem("token");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await api.get("api/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200) {
          setTasks(response.data);
        }
      } catch (error: any) {
        if (error.response && error.response.status == 401) {
          alert("Please log in to view your tasks.");
        }
      }
    };

    fetchTasks();
  }, []);

  function handleCreateTask() {
    navigate("/create-task")
  }

  return (
    <>
      <h2>Suas tarefas:</h2>
      <button onClick={handleCreateTask}>Criar Tarefa</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default TaskPage;
