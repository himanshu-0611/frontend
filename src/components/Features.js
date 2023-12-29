import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBContainer,
} from "mdb-react-ui-kit";
import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from '../public/images/bg6.png';
import "./features.css";
import Marquee from "react-fast-marquee";
import Card from "react-bootstrap/Card";

const cardsData = [
  {
    title: "Learn with Personal Login",
    imageSrc: "/images/home/learn1.jpeg",
  },
  {
    title: "Level Up with XP",
    imageSrc: "/images/home/xp.jpeg",
  },
  {
    title: "Task Tracker",
    imageSrc: "/images/home/task.jpeg",
  },
  {
    title: "Deadline Mastery",
    imageSrc: "/images/home/deadline.jpeg",
  },
  {
    title: "Compete on the Leaderboard",
    imageSrc: "/images/home/leaderboard.jpeg",
  },
  {
    title: "Weekly Live Discussions",
    imageSrc: "/images/home/ppldis.jpg",
  },
  {
    title: "Frequent Assessments",
    imageSrc: "/images/home/test.jpg",
  },
  {
    title: "DevCrusade Certification",
    imageSrc: "/images/home/certificate.jpeg",
  },
];

const featuresData = [
  {
    imageSrc: "/images/home/learn1.jpeg",
    title: "Learn with Personal Login",
    description:
      "Dive into an <strong>immersive learning experience</strong> with sequential access to all your content. Learn from  <strong>YouTube videos</strong> of reputed creators, <strong>read official documentation</strong>, and conquer your coursework.",
  },
  {
    imageSrc: "/images/home/xp.jpeg",
    title: "Level Up with XP",
    description:
      "Earn <strong>experience points (XP)</strong> for every task you successfully complete. Level up your skills and knowledge as you accumulate XP, showcasing your <strong>continuous growth</strong> and achievements. ",
  },
  {
    imageSrc: "/images/home/task.jpeg",
    title: "Task Tracker",
    description:
      "Stay <strong>organized</strong> and <strong>motivated</strong> by marking your completed tasks as done. Keep a <strong>daily track</strong> of your learning progress, schedule and tasks, ensuring you stay on <strong>top</strong> of your educational journey by tracking each day.",
  },
  {
    imageSrc: "/images/home/deadline.jpeg",
    title: "Deadline Mastery",
    description:
      "Conquer tasks within set <strong>deadlines</strong>. This fosters <strong>discipline</strong>, propelling you towards <strong>success</strong>. Meet challenges <strong>head-on</strong>, watch your progress as you master tasks within the given <strong>timeframe</strong>.",
  },
  {
    imageSrc: "/images/home/leaderboard.jpeg",
    title: "Compete on the Leaderboard",
    description:
      "Measure your progress <strong>against peers</strong> by accessing the <strong>program leaderboard</strong>. Discover where you <strong>stand</strong> in your batch, fostering <strong>healthy competition, drive to do more</strong> and <strong>motivation to excel</strong>.",
  },
  {
    imageSrc: "/images/home/ppldis.jpg",
    title: "Weekly Live Discussions",
    description:
      "Join <strong>engaging sessions</strong>, <strong>ask questions</strong>, and connect with a <strong>community</strong> of peers. Elevate your learning experience, and foster <strong>meaningful connections</strong> every week. Embrace the spirit of <strong>collaborative learning</strong>.",
  },
  {
    imageSrc: "/images/home/test.jpg",
    title: "Frequent Assessments",
    description:
      "Regular <strong>evaluations</strong> empower you to <strong>measure progress</strong>and refine your <strong>understanding</strong>. Actively enhance your learning journey. Elevate your skills through <strong>consistent evaluation</strong>.",
  },
  {
    imageSrc: "/images/home/certificate.jpeg",
    title: "DevCrusade Certification",
    description:
      "Cap off your learning journey with <strong>official recognition</strong>. Receive a <strong>certification</strong> from DevCrusade, <strong>validating your accomplishments</strong> and marking you ready to <strong>tackle real-world challenges</strong>.",
  },
];

export default function Features() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNextClick = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
  // };
  return (
    <div className="">
      <Marquee loop={0} delay={0} play={true} speed={160} pauseOnHover={true}>
        <div
          className="scrolling-container"
          style={{
            display: "flex",
          }}
        >
          {cardsData.map((card, index) => (
            <div key={index} className="card-container">
              <img
                src={card.imageSrc}
                alt=""
                style={{ height: "200px", width: "auto" }}
              />
              <Card.Footer>
                <p className="card-text-fea">{card.title}</p>
              </Card.Footer>
            </div>
          ))}
        </div>
      </Marquee>

      <MDBContainer
        fluid
        className="py-3 main-feat features mt-5 feat-head-mob"
        style={{
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repea",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
          Program Features
        </h2>

        <div
          className="hide-for-div"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            textAlign: "justify",
          }}
        >
          <Carousel interval={2000}>
            {featuresData.map((feature, index) => (
              <Carousel.Item key={index}>
                <img
                  src={feature.imageSrc}
                  alt={feature.title}
                  style={{ borderRadius: "10px" }}
                />
                <h3
                  style={{
                    color: "black",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{ color: "black", padding: "10px 10px 18px 10px" }}
                  dangerouslySetInnerHTML={{ __html: feature.description }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="main-timeline-2" style={{ width: "60vw" }}>
          {featuresData.map((feature, index) => {
            // Group features into pairs
            if (index % 2 === 0) {
              const nextFeature = featuresData[index + 1];
              return (
                <div
                  key={index}
                  className="side-by-side"
                  style={{ display: "flex" }}
                >
                  <div className={`timeline-2 left-2`}>
                    <MDBCard style={{ height: "100%", width: "auto" }}>
                      <MDBCardImage
                        src={feature.imageSrc}
                        alt="Responsive image"
                        position="top"
                        style={{ height: "200px", width: "auto" }}
                      />
                      <MDBCardBody className="p-4">
                        <h4 className="fw-bold mb-4">{feature.title}</h4>
                        <p
                          className="mb-0"
                          dangerouslySetInnerHTML={{
                            __html: feature.description,
                          }}
                        />
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                  {nextFeature && (
                    <div className={`timeline-2 right-2`}>
                      <MDBCard style={{ height: "100%", width: "auto" }}>
                        <MDBCardImage
                          src={nextFeature.imageSrc}
                          alt="Responsive image"
                          position="top"
                          style={{ height: "200px", width: "auto" }}
                        />
                        <MDBCardBody className="p-4">
                          <h4 className="fw-bold mb-4">{nextFeature.title}</h4>
                          <p
                            className="mb-0"
                            dangerouslySetInnerHTML={{
                              __html: nextFeature.description,
                            }}
                          />
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </MDBContainer>
    </div>
  );
}
