import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Ensure this is imported

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-hero d-flex flex-column justify-content-center align-items-center text-center px-3">
      <h1 className="display-3 fw-bold text-glow mb-3">SubTracker</h1>
      <p className="lead mb-4 fs-5">
        Manage all your subscriptions in one place.
        <br />
        Never miss a renewal again.
      </p>

      <button
        className="btn btn-primary btn-lg shadow-lg"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default Home;
