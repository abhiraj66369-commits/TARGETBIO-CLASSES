import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [guruOpen, setGuruOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Student check
  const student = JSON.parse(localStorage.getItem("student"));

  const logout = () => {
    localStorage.removeItem("student");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/sonu.png" alt="Institute Logo" />
        <span>Target Bio Classes</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/admission">Admission</Link></li>

        {/* 🔥 GURU MENU (UNCHANGED) */}
        <li className="guru-menu">
          <button
            className="guru-btn"
            onClick={() => setGuruOpen(!guruOpen)}
          >
            Guru ▾
          </button>

          {guruOpen && (
            <div className="guru-dropdown">
              <Link to="/guru-login" onClick={() => setGuruOpen(false)}>
                Teacher Login
              </Link>
              <Link to="/guru-register" onClick={() => setGuruOpen(false)}>
                Teacher Register
              </Link>
            </div>
          )}
        </li>

        {/* 🔐 STUDENT SECTION */}
        {student ? (
          <>
            <li>
              <Link to="/dashboard" className="login-btn">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile" className="login-btn">
                Profile
              </Link>
            </li>
            <li>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="login-btn">
              Student Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
