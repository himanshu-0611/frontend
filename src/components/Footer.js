import React from "react";
import "./footer.css"; // Import the CSS file for styling
import "./contact.css";

const Footer = () => {
  const handleEmailButtonClick = () => {
    window.location.href = "devcrusade@gmail.com";
  };
  return (
    <>
      <div className="con-container">
        <h2 className="con-heading">Contact Us</h2>
        <p className="con-text">
          For any inquiries, please contact us at{" "}
          <a href="devcrusade@gmail.com" className="con-link">
            devcrusade@gmail.com
          </a>
          .
        </p>
        <button className="con-button" onClick={handleEmailButtonClick}>
          Email Us
        </button>
      </div>
      <footer className="footer">
        <div className="social-icons">
          <a
            href="https://www.youtube.com/@himanshuagarkar"
            className="icon"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/logos/youtube.png" alt="Facebook" />
          </a>
          <a
            href="https://twitter.com/dev_crusade"
            className="icon"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/logos/twitter.png" alt="Twitter" />
          </a>
          <a
            href="https://www.instagram.com/devcrusade/"
            className="icon"
            target="_blank"
            rel="noreferrer" 
          >
            <img src="/images/logos/instagram.png" alt="Instagram" />
          </a>
          <a
            href="https://www.linkedin.com/company/devcrusade"
            className="icon"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/logos/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
        <div className="copyright">
          Copyright &copy; 2023 All Rights Reserved{" "}
          <a href="www.devcrusade.in" style={{ color: "purple", fontWeight: "bolder" }}>
            DevCrusade
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
