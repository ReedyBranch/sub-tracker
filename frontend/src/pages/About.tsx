import NavBar from "../components/NavBar";
import "../App.css";

function About() {
  return (
    <>
      <NavBar />
      <div className="about-container fade-in">
        <div className="glow-bg"></div>
        <div className="glow-bg glow-bg-2"></div>

        <div className="about-content text-center">
          <h1 className="text-glow mb-4">About SubTracker</h1>
          <p className="lead">
            SubTracker is a simple, elegant tool to help you manage all your
            subscriptions in one place. Our goal is to prevent surprise charges
            and give you clarity over recurring expenses.
          </p>
          <p>
            You can add, edit, and delete subscriptions, organize them by
            category, and track upcoming renewals. Built with React and
            Bootstrap, our dark-themed dashboard keeps your finances visually
            organized and interactive.
          </p>

          {/* Animated Feature Boxes */}
          <div className="features-grid row mt-5 text-center">
            <div className="col-md-4 mb-4 fade-in-up">
              <div className="feature-box glass-card p-4">
                <h5 className="text-glow">Track Subscriptions</h5>
                <p>
                  Easily view and manage all your recurring payments in one
                  place.
                </p>
              </div>
            </div>
            <div
              className="col-md-4 mb-4 fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="feature-box glass-card p-4">
                <h5 className="text-glow">Smart Reminders</h5>
                <p>Never miss a payment again with timely renewal alerts.</p>
              </div>
            </div>
            <div
              className="col-md-4 mb-4 fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="feature-box glass-card p-4">
                <h5 className="text-glow">Beautiful UI</h5>
                <p>
                  Enjoy a sleek, modern interface with animated backgrounds.
                </p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="tagline mt-5 text-glow">
            "Take control of your finances. One subscription at a time."
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
