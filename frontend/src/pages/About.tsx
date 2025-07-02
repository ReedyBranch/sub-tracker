import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function About() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="container py-5 text-white fade-in">
        <h1 className="text-glow mb-4">About SubTracker</h1>
        <p className="lead">
          SubTracker is a simple, elegant tool to help you manage all your
          subscriptions in one place. Our goal is to prevent surprise charges
          and give you clarity over recurring expenses.
        </p>
        <p>
          You can add, edit, and delete subscriptions, organize them by
          category, and track upcoming renewals. Built with React and Bootstrap,
          our dark-themed dashboard keeps your finances visually organized and
          interactive.
        </p>

        {/* ✅ Button Row */}
        <div className="mt-5 d-flex gap-3 justify-content-center">
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}

export default About;
