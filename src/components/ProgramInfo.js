import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./programinfo.css";

function ProgramInfo() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [programs] = useState([
    {
      title: "Placement Preperation",
      duration: "6 months",
      syllabus:
        "Mastering fundamentals and conquering <strong>CodeChef</strong> and <strong>LeetCode</strong> challenges. Intensive aptitude training in <strong>quants</strong>, logical reasoning, and verbal skills. Unlock the secrets of <strong>Computer Science</strong> fundamentals.",
      link: "https://example.com/placement",
      image: "/images/home/PR1.png",
      register: "/images/home/PR1.png",
      content:
        "Prepare yourself for placement success with our captivating <strong>6-month Placement Mastery Program</strong>! Master fundamentals and conquer <strong>CodeChef</strong> and <strong>LeetCode</strong> challenges. Elevate your cognitive prowess with intensive aptitude training in <strong>quants</strong>, <strong>logical reasoning</strong>, and <strong>verbal</strong> skills. Brush up <strong>Computer Science</strong> fundamentals, including the dynamic realms of <strong>DBMS</strong>, <strong>OS</strong>, <strong>CN</strong>, and <strong>OOPS</strong>, along with guidance to complete an <strong>AICTE Internship</strong> and <strong>Personal Major Project</strong>. Get ready to shine in placements in just six action-packed months!",
    },
    {
      title: "Programming Basics and DSA",
      duration: "4 months",
      syllabus:
        "Mastering programming fundamentals and <strong>Data Structures and Algorithms (DSA)</strong> in <strong>C++, Java, or Python</strong>. Covering essentials like <strong>Arrays</strong> and <strong>Strings</strong> to advanced topics such as <strong>Graphs</strong> and <strong>Dynamic Programming</strong>.",
      link: "https://example.com/programming-basics",
      register: "https://example.com/programming-basics",
      image:
        "https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1600,h_588/https://www.hash13.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-04-at-11.31.19-PM.jpeg",
      content:
        "Embark on a comprehensive 4-month programming journey, focusing on mastering programming fundamentals and strong <strong>Data Structures and Algorithms (DSA)</strong> skills in <strong>C++, Java, or Python</strong>. Through engaging exercises, including mastering LeetCode and Geeks for Geeks challenges, and learning patterns to effectively solve questions, the program covers essential topics like <strong>Arrays</strong> and <strong>Strings</strong> to more advanced concepts such as <strong>Graphs</strong> and <strong>Dynamic Programming</strong>. This well-rounded curriculum ensures a thorough understanding of key programming principles, providing a solid foundation within a short timeframe.",
    },
    {
      title: "Full Stack Website Development using MERN",
      duration: "4 months",
      syllabus:
        "Master <strong>MERN Stack Development</strong> in under 4 months. Starting from <strong>HTML, CSS, and React</strong>, delve into backend with <strong>Node.js</strong> and <strong>MongoDB</strong> as a database. Learn to build standalone and independent websites.",
      link: "https://example.com/mern-stack",
      register: "https://example.com/mern-stack",
      image: "https://static.javatpoint.com/blog/images/mern-stack.png",
      content:
        "Embark on an accelerated journey to master <strong>MERN Stack Development</strong> within a concise 4-month timeframe. Begin by mastering the front-end essentials, including <strong>HTML, CSS</strong>, and the powerful <strong>React</strong> library. Dive into the backend realm with <strong>Node.js</strong> as your server-side runtime environment, and leverage the flexibility of <strong>MongoDB</strong> as the database of choice. Throughout this comprehensive program, you'll acquire the skills to construct standalone and independent websites, equipping you to build dynamic platforms reminiscent of industry giants like <strong>Facebook</strong> and <strong>Instagram</strong>.",
    },
  ]);

  // New state for JSON data for the table
  const [tableData, setTableData] = useState([]);

  // New JSON data for the table
  const tableJsonData = [
    {
      title: "Placement Run",
      duration: "6 months",
      details:
        "After completing the program sincerely, one would have: <br/><br/>• Attempted 60+ CodeChef and LeetCode Contests combined.<br/>• 1 Internship and 1 Project in Resume.<br/>• Substantial Advantage which will set you apart from your fellow peers.<br/> <br/>We will provide guidance to complete the AICTE internship and project, but the decision to work for them ultimately rests with the student, he/she will get certificate from AICTE if the internhip is completed.",
      downloads:
        "https://docs.google.com/document/d/1Q1UaOruN6PRsHmA9qZgGsxaaHXkMpIAEFuDhIj0N38Y/edit?usp=sharing",
      register: "https://example.com/placement",
      fees: "Free",
    },
    {
      title: "Programming Basics and DSA",
      duration: "4 months",
      details:
        "Mastering programming fundamentals and <strong>Data Structures and Algorithms (DSA)</strong> in <strong>C++, Java, or Python</strong>. Covering essentials like <strong>Arrays</strong> and <strong>Strings</strong> to advanced topics such as <strong>Graphs</strong> and <strong>Dynamic Programming</strong>.",
      downloads:
        "https://docs.google.com/document/d/1TOVwK_EZ5UUDg8F3YPBj403UayHTHp5ad53TfpSumkw/edit?usp=sharing",
      register: "https://example.com/programming-basics",
      fees: "Free",
    },
    {
      title: "Full Stack Website Development using MERN",
      duration: "4 months",
      details:
        "Master <strong>MERN Stack Development</strong> in under 4 months. Starting from <strong>HTML, CSS, and React</strong>, delve into backend with <strong>Node.js</strong> and <strong>MongoDB</strong> as a database. Learn to build standalone and independent websites.",
      downloads:
        "https://docs.google.com/document/d/1iVix3qcdPpJdRoOAh_kqiCY1JKPLkMuclHkWU88-jNM/edit?usp=sharing",
      register: "https://example.com/mern-stack",
      fees: "Free",
    },
  ];

  const handleRowHover = (index) => {
    setHoveredRow(index);
  };

  const resetHoveredRow = () => {
    setHoveredRow(null);
  };

  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleProgramSelect = (index) => {
    const element = document.getElementById("yourTargetId");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Optional: adds smooth scrolling animation
      });
    }

    setSelectedProgram(index);
    setCurrentIndex(index); // Add this line to update currentIndex when a program is selected
  };

  // Set the table data when the component mounts
  useState(() => {
    setTableData(tableJsonData);
  }, []);

  useEffect(() => {
    setTableData(tableJsonData);
    setSelectedProgram(0); // Select the first program initially
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    // Update the currentIndex to point to the next program
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length);
  };

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Set initial screen size
    handleResize();

    // Attach the event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2vh 2vh" }}>Our Programs</h1>

      <CardGroup className="template-card-group" style={{ margin: "3%" }}>
        {programs.map((program, index) => (
          <Card
            key={index}
            className="card-hai-ye"
            style={{
              margin: "1%",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <Card.Img
              variant="top"
              src={program.image}
              style={{ borderRadius: "10px 10px 0 0" }}
            />
            <Card.Body>
              <Card.Title>{program.title}</Card.Title>
              <Card.Text>
                <span dangerouslySetInnerHTML={{ __html: program.content }} />
              </Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                borderTop: "1px solid #ddd",
                borderRadius: "0 0 10px 10px",
              }}
            >
              <Button
                variant="primary"
                onClick={() => handleProgramSelect(index)}
              >
                Show Details
              </Button>
              {program.register && (
                <Button
                  variant="success"
                  href={program.register}
                  target="_blank"
                  style={{ marginLeft: "10px" }}
                >
                  Register
                </Button>
              )}
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
      {selectedProgram !== null && tableData[selectedProgram] && (
        <div
          className="program-det"
          style={{
            color: "white",
            padding: "20px",
          }}
        >
          <h2
            id="yourTargetId"
            className="tab-head"
            style={{ textAlign: "center" }}
          >
            Program Details
          </h2>
          <table
            border="1"
            style={{
              margin: "0 auto",
              width: "70%",
              borderCollapse: "collapse",
              background: "white",
              color: "black",
              fontSize: "1.1rem",
              borderRadius: "0",
              overflow: "hidden",
            }}
          >
            <tbody>
              {Object.entries(tableData[currentIndex]).map(
                ([key, value], index) => (
                  <tr
                    key={key}
                    onMouseEnter={() => handleRowHover(index)}
                    onMouseLeave={resetHoveredRow}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "#3B3B3B" : "transparent",
                      transition: "background-color 0.3s ease",
                      backgroundColor:
                        hoveredRow === index ? "#BFBFBF" : "transparent",
                      marginBottom: "20px",
                    }}
                  >
                    <td
                      style={{
                        padding: "15px",
                        border: "4px solid black",
                        textAlign: "left",
                        fontWeight: "bold",
                        fontSize:
                          index === 0 && key === "title" ? "1.3rem" : "normal",
                        display: isMobileView ? "none" : "table-cell",
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </td>
                    <td
                      className="mobile-hidden"
                      style={{
                        padding: "15px",
                        border: "4px solid black",
                        textAlign: "left",
                        fontWeight:
                          index === 0 && key === "title" ? "bolder" : "normal",
                        fontSize:
                          index === 0 && key === "title" ? "1.3rem" : "normal",
                      }}
                    >
                      {key === "register" ? (
                        <Button variant="primary" href={value} target="_blank">
                          Google Form Link
                        </Button>
                      ) : key === "downloads" ? (
                        <Button variant="primary" href={value} target="_blank">
                          Syllabus PDF
                        </Button>
                      ) : typeof value === "string" ? (
                        <span dangerouslySetInnerHTML={{ __html: value }} />
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* Next Button */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button variant="primary" onClick={handleNextClick}>
              Next Program
            </Button>
          </div>
        </div>
      )}
      <h2 className="tab-head" style={{ textAlign: "center", margin: "10px"}}>
        Program Flow
      </h2>
      <div style={{marginBottom: "10px"}}>
        <div
          className="d-flex"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {/* <ListGroup style={{ padding: "5px" }}>
            <ListGroup.Item>Step 1</ListGroup.Item>
            <ListGroup.Item>Step 2</ListGroup.Item>
            <ListGroup.Item>Step 3</ListGroup.Item>
          </ListGroup> */}
          <ListGroup style={{ padding: "5px" }}>
            <ListGroup.Item>
              Step 1: 1st to Last Day of current Month (eg. 1st Jan to 31 Jan)
            </ListGroup.Item>
            <ListGroup.Item>
              Step 2: 1st Day of the Next Month (eg. 2nd Feb)
            </ListGroup.Item>
            <ListGroup.Item>
              Step 3: 2nd Day of the Next Month (eg. 3rd Feb)
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className="ml-4" style={{ padding: "5px" }}>
            <ListGroup.Item>
              Interested students register for our program through google form
            </ListGroup.Item>
            <ListGroup.Item>
              We verify and send Login Details to the students who have
              registered
            </ListGroup.Item>
            <ListGroup.Item>
              Users can login and start with their learning path
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
export default ProgramInfo;
