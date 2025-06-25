import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="/">
        SubTracker
      </a>

      <div className="ml-auto">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
