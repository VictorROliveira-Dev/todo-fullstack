import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/axios";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/tasks");
    }
  }, [navigate]);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("api/auth/login", {
        username,
        password,
      });

      if (response.status == 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/tasks");
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{loading ? "Entrando..." : "Entrar"}</button>
      </form>
    </>
  );
};

export default LoginPage;
