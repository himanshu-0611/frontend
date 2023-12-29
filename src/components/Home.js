import React from "react";
import { Element } from "react-scroll";
import "./home.css"; // Import the external CSS file
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import ProgramCards from "./ProgramCards";
import { useState, useEffect } from "react";

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

   const handleHover = () => {
     setZoom(1.2); // Set the zoom value when hovering
   };

   const handleLeave = () => {
     setZoom(1); // Reset the zoom value when not hovering
   };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const handleLogout = () => {
  //   // Remove the isLoggedIn and userName cookies to log the user out
  //   Cookies.remove("isLoggedIn");
  //   Cookies.remove("userName");

  //   // Redirect to the login page
  //   navigate("/login");
  // };

  // Check if the user is logged in and retrieve their name from the cookie
  // const isLoggedIn = Cookies.get("isLoggedIn");
  // const userName = Cookies.get("userName");

  const [zoom, setZoom] = useState(1);

  const handleScroll = () => {
    // Calculate the new zoom level based on the scroll position or any other factor
    const newZoom = 1 + window.scrollY * 0.0005;

    // Update the zoom state
    setZoom(newZoom);
  };

  useEffect(() => {
    // Add a scroll event listener to track the scroll position
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerStyle = {
    padding: "30px",
    flex: "1",
    borderLeft: "4px solid white", // Add this line for the vertical line
    marginLeft: "10px", // Adjust the left margin for spacing
  };

  const heading1Style = {
    fontSize: "70px",
    textAlign: "left",
  };

  const heading3Style = {
    textAlign: "left",
    // textJustify: 'inter-word',
    // textAlignLast: 'center',
  };

  return (
    <div>
      <div>
        {isMobile ? (
          // Render mobile view structure
          <div
            className="container"
            style={{
              // backgroundImage: `url("/images/home/purple.png")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="text">
              <h1 style={heading1Style} className="header-main">
                DevCrusade
              </h1>
              <div
                className="image"
                style={{
                  flex: "1",
                  textAlign: "center",
                  overflow: "hidden",
                  borderRadius: "70%",
                  border: "12px solid purple",
                }}
              >
                <img
                  src="/images/home/main.png"
                  alt="Main Img"
                  style={{
                    borderRadius: "70%",
                    transform: `scale(${zoom})`, // Apply the zoom transformation
                    transition: "transform 0.2s ease-in-out", // Add a smooth transition effect
                  }}
                />
              </div>
              <h3 style={heading3Style} className="desc-head">
                A community promoting self-study which gives aspiring software
                engineers a roadmap to achieve expertise in their interested
                domain through collaborative learning.
              </h3>
            </div>
          </div>
        ) : (
          // Render desktop view structure
          <div
            className="container"
            style={{
              // backgroundImage: `url("/images/home/purple.png")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="text" style={containerStyle}>
              <h1 style={heading1Style}>DevCrusade</h1>
              <h3 style={heading3Style}>
                A community promoting self-study which gives aspiring software
                engineers a roadmap to achieve expertise in their interested
                domain through collaborative learning.
              </h3>
            </div>
            <div
              className="image"
              style={{
                flex: "1",
                textAlign: "center",
                overflow: "hidden",
                borderRadius: "70%",
                border: "12px solid purple",
              }}
            >
              <img
                src="/images/home/main.png"
                alt="Main Img"
                style={{
                  borderRadius: "70%",
                  transform: `scale(${zoom})`, // Apply the zoom transformation
                  transition: "transform 0.2s ease-in-out", // Add a smooth transition effect
                }}
                onMouseOver={handleHover}
                onMouseOut={handleLeave}
              />
            </div>
          </div>
        )}
      </div>
      <ProgramCards />
      <Features id="features-section" />
      <Testimonials />
      <Element name="contact-section">
        <div>
          {/* Your content */}
          <Footer />
        </div>
      </Element>
    </div>
  );
}

export default Home;
