import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Target Bio Classes. All rights reserved.
    </footer>
  );
}

export default Footer;
