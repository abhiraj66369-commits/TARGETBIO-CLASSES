import { useState } from "react";
import "../styles/home.css";

function Home() {

  /* 🤖 BIO BUDDY LOGIC */
  const messages = [
    "Hi! Main Bio Buddy hoon 😄",
    "Biology ab bilkul easy ho gayi 🧠✨",
    "Video dekho aur smart bano 🎥",
    "Notes download karna mat bhoolna 📘",
    "NEET crack karna hai toh daily padho 💪"
  ];

  const [showText, setShowText] = useState("");
  const [visible, setVisible] = useState(false);

  const speakBuddy = () => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    setShowText(msg);
    setVisible(true);

    // 🔊 Voice
    const voice = new SpeechSynthesisUtterance(msg);
    voice.lang = "en-IN";
    voice.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(voice);

    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <>
      {/* HERO */}
      <section className="kids-hero">
        <div className="kids-left">
          <h1>
            🎓 Target Bio Classes <br />
            <span>Biology banaye super easy 🧠✨</span>
          </h1>

          <p>
            NEET, 11th & 12th ke liye <b>fun videos</b>,  
            <b>easy notes</b> aur <b>smart tests</b>.
          </p>

          <div className="kids-buttons">
            <a href="/admission" className="btn-kids">
              🚀 Take Admission
            </a>
            <a href="/courses" className="btn-kids-outline">
              📚 Free Demo
            </a>
          </div>

          <div className="emoji-row">
            🧬 📘 🧪 🧠 🎯
          </div>
        </div>

        <div className="kids-right">
          <img src="/Avengers.jpg" alt="study fun" />
        </div>

        {/* 🤖 BIO BUDDY */}
<div
  className="bio-buddy"
  onMouseEnter={() => {
    setShowText("Hi! 👋 Main Bio Buddy hoon \nBiology ab super easy! 🧠✨");
    setVisible(true);
  }}
  onMouseLeave={() => setVisible(false)}
  onClick={speakBuddy}
>
  <img src="/mascot3.png" alt="Bio Buddy" />

  {visible && (
    <div className="buddy-text">
      {showText}
    </div>
  )}
</div>
      </section>

      {/* FUN CARDS */}
      <section className="fun-section">
        <h2>Yahan padhna = Maja 😄</h2>

        <div className="fun-cards">
          <div className="fun-card">
            🎥
            <h3>Animated Videos</h3>
            <p>Hard topics ko simple bana dete hain</p>
          </div>

          <div className="fun-card">
            📒
            <h3>Easy Notes</h3>
            <p>Short + clear + exam focused</p>
          </div>

          <div className="fun-card">
            🧪
            <h3>Practice Tests</h3>
            <p>Daily practice se confidence boost</p>
          </div>

          <div className="fun-card">
            🔒
            <h3>Secure App</h3>
            <p>Only enrolled students access content</p>
          </div>
        </div>
      </section>

      {/* TEACHER */}
      <section className="team">
        <h2>Meet Your Teachers 👨‍🏫💖</h2>

        <div className="team-row">
          <div className="team-card">
            <img src="/sonu.png" alt="Sonu Sir" />
            <h3>Sonu Sir</h3>
            <p>15+ years experience<br />Biology Expert</p>
          </div>

          <div className="team-card">
            <img src="/sajan.jpg" alt="Sajan Sir" />
            <h3>Sajan Sir</h3>
            <p>15+ years experience<br />Biology Expert</p>
          </div>

          <div className="team-card">
            <img src="/abhinash.jpg" alt="Abhinash Sinha" />
            <h3>Abhinash Sinha</h3>
            <p>LMS Architect<br />Developer</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="kids-cta">
        <h2>Ready to Crack NEET? 🚀</h2>
        <p>
          Ab Biology se dar nahi,  
          Target Bio Classes ke sath jeet pakki 💪
        </p>

        <a href="/admission" className="btn-kids big">
          🎉 Join Now
        </a>
      </section>
    </>
  );
}

export default Home;
