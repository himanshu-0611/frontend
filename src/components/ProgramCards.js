import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function ProgramCards() {
  const navigate = useNavigate();
  const handleMoreDetails = (link) => {
    // Navigate to the "/program-info" route when "More Details" is clicked
    navigate("/Programs");
  };
  // Initial data
  const initialData = [
    {
      title: "Placement Preperation",
      image: "/images/home/PR1.png",
      buttonText: "More Details",
      content:
        "Prepare yourself for placement success with our captivating <strong>6-month Placement Mastery Program</strong>! Master fundamentals and conquer <strong>CodeChef</strong> and <strong>LeetCode</strong> challenges. Elevate your cognitive prowess with intensive aptitude training in <strong>quants</strong>, <strong>logical reasoning</strong>, and <strong>verbal</strong> skills. Brush up <strong>Computer Science</strong> fundamentals, including the dynamic realms of <strong>DBMS</strong>, <strong>OS</strong>, <strong>CN</strong>, and <strong>OOPS</strong>, along with guidance to complete an <strong>AICTE Internship</strong> and <strong>Personal Major Project</strong>. Get ready to shine in placements in just six action-packed months!",
      link: "https://example.com/placement",
      register: "https://example.com/placement",
    },
    {
      title: "Programming Basics and DSA",
      image:
        "https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1600,h_588/https://www.hash13.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-04-at-11.31.19-PM.jpeg",
      content:
        "Embark on a comprehensive 4-month programming journey, focusing on mastering programming fundamentals and strong <strong>Data Structures and Algorithms (DSA)</strong> skills in <strong>C++, Java, or Python</strong>. Through engaging exercises, including mastering LeetCode and Geeks for Geeks challenges, and learning patterns to effectively solve questions, the program covers essential topics like <strong>Arrays</strong> and <strong>Strings</strong> to more advanced concepts such as <strong>Graphs</strong> and <strong>Dynamic Programming</strong>. This well-rounded curriculum ensures a thorough understanding of key programming principles, providing a solid foundation within a short timeframe.",
      buttonText: "More Details",
      link: "https://example.com/programming-basics",
      register: "https://example.com/programming-basics",
    },
    {
      title: "Full Stack Website Development using MERN",
      image: "https://static.javatpoint.com/blog/images/mern-stack.png",
      content:
        "Embark on an accelerated journey to master <strong>MERN Stack Development</strong> within a concise 4-month timeframe. Begin by mastering the front-end essentials, including <strong>HTML, CSS</strong>, and the powerful <strong>React</strong> library. Dive into the backend realm with <strong>Node.js</strong> as your server-side runtime environment, and leverage the flexibility of <strong>MongoDB</strong> as the database of choice. Throughout this comprehensive program, you'll acquire the skills to construct standalone and independent websites, equipping you to build dynamic platforms reminiscent of industry giants like <strong>Facebook</strong> and <strong>Instagram</strong>.",
      buttonText: "More Details",
      link: "https://example.com/mern-stack",
      register: "https://example.com/mern-stack",
    },
  ];

  const [data, setData] = useState(initialData);

  return (
    <>
      <h2 style={{ textAlign: "center" }} className="prog-start">Our Programs</h2>
      <CardGroup style={{ margin: "3%" }}>
        {data.map((program, index) => (
          <Card
            key={index}
            className="home-card"
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
              <Card.Text
                dangerouslySetInnerHTML={{ __html: program.content }}
              ></Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                borderTop: "1px solid #ddd",
                borderRadius: "0 0 10px 10px",
              }}
            >
              <Button
                variant="primary"
                onClick={() => handleMoreDetails(program.link)}
              >
                {program.buttonText}
              </Button>
              <Button
                variant="success"
                href={program.register}
                target="_blank"
                style={{ marginLeft: "5px" }}
              >
                Register
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </>
  );
}

export default ProgramCards;
