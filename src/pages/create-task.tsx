import { useState } from "react";
import { api } from "../lib/axios";

interface Task {
  id?: number;
  name: string;
  description: string;
  categoryId: number;
  userId?: string;
}

const CreateTask: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Usuário não autênticado");
      return
    }

    const newTask: Task = {
      name,
      description,
      categoryId,
    };

    try {
      const response = await api.post("api/task", newTask, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })

      console.log("Tarefa criada com sucesso!", response.data);
      alert("Tarefa criada com sucesso!")
    } catch (error) {
      alert("Erro ao criar tarefa.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome da tarefa:</label>
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="categoryId">Categoria:</label>
        <input
          type="number"
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
          required
        />
      </div>

      <button type="submit">Criar Tarefa</button>
    </form>
  );
};

export default CreateTask;
