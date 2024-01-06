import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Navbar, Nav } from "react-bootstrap"; // Import React Bootstrap components
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import "./style.css";

function NavbarComponent() {
  const isLoggedIn = Cookies.get("isLoggedIn"); // Check if the user is logged in
  const navigate = useNavigate();

  const [navExpanded, setNavExpanded] = useState(false);

 const handleNavHover = (e) => {
   e.target.style.color = "white";
 };

 const handleNavLeave = (e) => {
   e.target.style.color = "#CACACA";
 };

  const handleToggle = () => {
    setNavExpanded(!navExpanded);
  };

  const handleClose = () => {
    setNavExpanded(false);
  };

  const handleLogout = () => {
    // Remove the isLoggedIn and userName cookies to log the user out
    Cookies.remove("isLoggedIn");
    Cookies.remove("userName");
    Cookies.remove("userId");
    Cookies.remove("i");
    localStorage.clear();
    setNavExpanded(false);

    // Redirect to the login page
    navigate("/LogIn");
  };

  const handleScrollToContact = () => {
    setNavExpanded(false);
    // Use the `scroll` function to scroll to a specific section by its name
    scroll.scrollTo("contact-section", {
      duration: 200,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <div className="custom-nav">
      {/* Mobile Navbar */}
      <Navbar
        bg="dark"
        className="navbar-main"
        variant="dark"
        expand="lg"
        expanded={navExpanded}
      >
        <div className="p-3 img-fluid d-flex align-items-center">
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={handleClose}
            className="d-flex align-items-center"
          >
            <img
              src="/images/logos/dcwhitebg.png"
              alt="Logo"
              className="rounded-circle img-fluid logo-main"
              style={{ width: "50px", height: "auto"}}
            />
            <span
              style={{
                marginLeft: "1rem",
                color: "white",
                textDecoration: "none",
                fontSize: "1.5rem",
                fontWeight: "500",
              }}
            >
              DevCrusade
            </span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
            style={{
              height: "40px",
              position: "absolute",
              right: "20px"
            }}
          />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            style={{
              marginLeft: "auto",
              marginRight: "30px",
              fontSize: "1.2rem",
              fontWeight: "12px",
            }}
          >
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleClose}
              style={{ color: "#CACACA", textAlign: "center" }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Programs"
              onClick={handleClose}
              style={{ color: "#CACACA", textAlign: "center" }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              Programs
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Podcasts"
              onClick={handleClose}
              style={{ color: "#CACACA", textAlign: "center" }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              Podcasts
            </Nav.Link>
            <Nav.Link
              as={ScrollLink}
              to="contact-section"
              smooth={true}
              onClick={handleScrollToContact}
              style={{ cursor: "pointer", color: "#CACACA", textAlign: "center" }}
              onMouseEnter={handleNavHover}
              onMouseLeave={handleNavLeave}
            >
              Contact
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/Profile"
                  onClick={handleClose}
                  style={{ color: "#CACACA", textAlign: "center" }}
                  onMouseEnter={handleNavHover}
                  onMouseLeave={handleNavLeave}
                >
                  Profile
                </Nav.Link>
                <Nav.Item className="log-but">
                  <button
                    className="btn btn-danger low-for-mob"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Nav.Item>
              </>
            ) : (
              <>
                {/* <Nav.Link
                  as={Link}
                  to="/SignUp"
                  onClick={handleClose}
                  style={{ color: "#CACACA", textAlign: "center" }}
                  onMouseEnter={handleNavHover}
                  onMouseLeave={handleNavLeave}
                >
                  Sign Up
                </Nav.Link> */}
                <Nav.Link
                  as={Link}
                  to="/LogIn"
                  onClick={handleClose}
                  style={{ color: "#CACACA", textAlign: "center" }}
                  onMouseEnter={handleNavHover}
                  onMouseLeave={handleNavLeave}
                >
                  Log In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
