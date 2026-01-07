import "../styles/home.css";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="badge">🚀 Trusted by 5,000+ Students</span>

          <h1>
            Target Bio Classes <br />
            <span>Crack NEET with Confidence</span>
          </h1>

          <p>
            India’s trusted institute for <b>NEET, JEE, 11th & 12th</b>.
            Learn with expert teachers, premium content, tests & mentorship.
          </p>

          <div className="hero-buttons">
            <a href="/admission" className="btn primary">
              🎓 Take Admission
            </a>
            <a href="/courses" className="btn outline">
              📚 Explore Courses
            </a>
          </div>

          <div className="stats">
            <div>
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div>
              <h3>98%</h3>
              <p>Student Satisfaction</p>
            </div>
            <div>
              <h3>5000+</h3>
              <p>Success Stories</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src="/hero.png" alt="Target Bio Classes" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2>Why Choose Target Bio Classes?</h2>

        <div className="features">
          <div className="feature-card">
            <span>👨‍🏫</span>
            <h3>Expert Faculty</h3>
            <p>15+ years of NEET & Board teaching experience.</p>
          </div>

          <div className="feature-card">
            <span>📘</span>
            <h3>Premium Content</h3>
            <p>Video lectures, notes, PDFs & tests.</p>
          </div>

          <div className="feature-card">
            <span>🔒</span>
            <h3>Secure LMS</h3>
            <p>Locked content access only for enrolled students.</p>
          </div>

          <div className="feature-card">
            <span>🎯</span>
            <h3>Result Oriented</h3>
            <p>Focused preparation for NEET & Boards.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team">
        <h2>Meet Our Core Team</h2>

        <div className="team-cards">
          <div className="team-card">
            <img src="/sonu.png" alt="Director" />
            <h3>Sonu Sir</h3>
            <span>Founder & Director</span>
            <p>15+ years of experience in Biology & NEET coaching.</p>
          </div>

          <div className="team-card">
            <img src="/sajan.jpg" alt="Teacher" />
            <h3>Sajan Sir</h3>
            <span>Senior Faculty</span>
            <p>NEET & Board exam specialist.</p>
          </div>

          <div className="team-card">
            <img src="/abhinash.jpg" alt="Developer" />
            <h3>Abhinash Sinha</h3>
            <span>LMS Architect</span>
            <p>Designed & developed complete LMS platform.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Start Your Success Journey Today</h2>
        <p>
          Limited seats available. Take admission now and get access to
          premium learning content.
        </p>
        <a href="/admission" className="btn primary big">
          🚀 Apply for Admission
        </a>
      </section>
    </>
  );
}

export default Home;
