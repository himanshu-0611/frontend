// // placement run main, others progs below
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import "./home.css"; // Import the external CSS file
// import Features from "./Features";
// import Testimonials from "./Testimonials";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Footer from "./Footer";

// function Home() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove the isLoggedIn and userName cookies to log the user out
//     Cookies.remove("isLoggedIn");
//     Cookies.remove("userName");

//     // Redirect to the login page
//     navigate("/login");
//   };

//   // Check if the user is logged in and retrieve their name from the cookie
//   const isLoggedIn = Cookies.get("isLoggedIn");
//   const userName = Cookies.get("userName");

//   return (
//     <div>
//       <div
//         className="container"
//         style={{
//           // backgroundImage: `url("/images/home/purple.png")`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="text" style={{ padding: "30px", flex: "1" }}>
//           <h1 style={{ fontSize: "10vh" }}>DevCrusade</h1>
//           <h3
//             style={{
//               textAlign: "justify",
//               textJustify: "inter-word",
//               textAlignLast: "center",
//             }}
//           >
//             A community promoting self-study which gives software engineers a
//             roadmap to achieve expertise in their interested domain through
//             collaborative learning.
//           </h3>
//           {isLoggedIn === "true" && userName ? (
//             <div>
//               <p>Welcome, {userName}!</p>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           ) : null}
//         </div>
//         <div className="image" style={{ flex: "1", textAlign: "center" }}>
//           <img
//             src="/images/home/main.jpg"
//             alt="Your Image"
//             style={{
//               borderRadius: "70%", // Make it circular
//               border: "12px solid purple", // Add a purple border
//             }}
//           />
//         </div>
//       </div>
//       <div
//         id="programs-section"
//         style={{
//           backgroundColor: "white",
//           color: "black",
//           padding: "50px",
//           marginTop: "10px",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
//           Our Programs
//         </h2>
//         <Card style={{ width: "35vw", margin: "auto" }}>
//           <Card.Img
//             variant="top"
//             src="/images/home/PR1.png"
//             style={{ order: "1px solid black" }}
//           />
//           <Card.Body>
//             <Card.Title>
//               Placement Preperation (Aptitude+DSA+Frontend+CS Fundamentals)
//             </Card.Title>
//             <Card.Text>
//               Prepare yourself for placement success with our captivating{" "}
//               <strong>6-month Placement Mastery Program</strong>! Dive into the
//               heart of programming excellence, mastering fundamentals and
//               conquering <strong>CodeChef</strong> and <strong>LeetCode</strong>{" "}
//               challenges. Elevate your cognitive prowess with intensive aptitude
//               training in <strong>quants</strong>,{" "}
//               <strong>logical reasoning</strong>, and <strong>verbal</strong>{" "}
//               skills. Unlock the secrets of <strong>Computer Science</strong>{" "}
//               fundamentals, including the dynamic realms of{" "}
//               <strong>DBMS</strong>, <strong>OS</strong>, <strong>CN</strong>,
//               and <strong>OOPS</strong>. Get ready to shine in placements and
//               unleash your full potential in just six action-packed months!
//             </Card.Text>
//             <Button variant="primary">Go somewhere</Button>
//           </Card.Body>
//         </Card>
//         <div className="programs-container" style={{ marginTop: "10px" }}>
//           {/* margin applied externally */}
//           <Card style={{ width: "35vw" }}>
//             <Card.Img
//               variant="top"
//               src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1600,h_588/https://www.hash13.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-04-at-11.31.19-PM.jpeg"
//             />
//             <Card.Body>
//               <Card.Title>Programming Basics and DSA</Card.Title>
//               <Card.Text>
//                 Embark on a <strong> 4-month programming journey</strong>,
//                 mastering programming fundamentals and Data Structures and
//                 Algorithms (DSA) in <strong>C++, Java, or Python</strong>.
//                 Covering essentials like <strong>Arrays and Strings</strong> to
//                 advanced topics such as <strong>Graphs</strong> and{" "}
//                 <strong>Dynamic Programming</strong>, gain a well-rounded
//                 understanding in a short timeframe.
//               </Card.Text>
//               <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//           </Card>
//           <Card style={{ width: "35vw" }}>
//             <Card.Img
//               variant="top"
//               src="https://static.javatpoint.com/blog/images/mern-stack.png"
//             />
//             <Card.Body>
//               <Card.Title>Full Stack Website Development using MERN</Card.Title>
//               <Card.Text>
//                 <strong>Embark</strong> on a rapid journey to master{" "}
//                 <strong>MERN Stack Development</strong> in under{" "}
//                 <strong>4 months</strong>. Starting from{" "}
//                 <strong>HTML, CSS, and React</strong>, delve into backend with{" "}
//                 <strong>Node.js</strong> and <strong>MongoDB</strong> as
//                 database. Learn to build standalone and independent websites,
//                 acquiring the skills to create dynamic platforms like{" "}
//                 <strong>Facebook</strong> & <strong>Instagram</strong>.
//               </Card.Text>
//               <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//       <Features id="features-section" />
//       <Testimonials />
//       <Footer />
//     </div>
//   );
// }

// export default Home;
