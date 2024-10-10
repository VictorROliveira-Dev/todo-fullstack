import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login-page";
import PrivateRoute from "./components/private-route";
import TaskPage from "./pages/task-page";
import CreateTask from "./pages/create-task";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-task"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
