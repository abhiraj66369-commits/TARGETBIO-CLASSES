import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [guruOpen, setGuruOpen] = useState(false);

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

        {/* 🔥 GURU MENU */}
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

        <li>
          <Link to="/login" className="login-btn">Student Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
