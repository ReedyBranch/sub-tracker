import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-3">
      <h1 className="display-4 mb-3">SubTracker</h1>
      <p className="lead mb-4">
        Manage all your subscriptions in one place. Never miss a renewal again.
      </p>

      <button
        className="btn btn-primary btn-lg"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default Home;
