import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Testimonials() {
  return (
    <MDBContainer
      fluid
      className="py-5 mt-5"
      style={{ backgroundColor: "#f3f2f2", color: "#000" }}
      id="testimonials-section"
    >
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h3 className="fw-bold mb-4">Testimonials</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            Our community started back in February 2023, and since then, more
            than 300 people have completed the various programs offered by us.
            Here is a glance at a few placed students who have been part of
            DevCrusade.
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center">
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="/images/home/harshshende.jpg"
                  className="rounded-circle shadow-1-strong"
                  width="100"
                  height="100"
                  alt="profile img"
                />
              </div>
              <h5 className="font-weight-bold">Harsh Shende</h5>
              <h6 className="font-weight-bold my-3">
                Trainee Software Engineer,
                <br />
                GlobalLogic
              </h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star-half-alt" size="sm" color="info" />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                Completed the 4 Months DSA Program of DevCrusade, and it
                definitely helped me secure a good placement. The program was
                exhaustive, and the order of resources was to the point.
              </p>
              <a
                href="https://www.linkedin.com/in/harsh-shende/"
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/logos/link.png"
                  alt="LinkedIn"
                  height={30}
                  width={30}
                />
              </a>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="/images/home/harshalyallewar.jpg"
                  className="rounded-circle shadow-1-strong"
                  width="100"
                  height="100"
                  alt="profile img"
                />
              </div>
              <h5 className="font-weight-bold">Harshal Yallewar</h5>
              <h6 className="font-weight-bold my-3">
                Trainee Software Engineer,
                <br /> GlobalLogic
              </h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon far icon="star" size="sm" color="info" />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                The DSA program of DevCrusade is comprehensive. The
                effectiveness of having all the sources of learning already
                combined, and we just have to gain knowledge, definitely makes
                the learning journey a lot smoother.
              </p>
              <a
                href="https://www.linkedin.com/in/harshalyallewar"
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/logos/link.png"
                  alt="LinkedIn"
                  height={30}
                  width={30}
                />
              </a>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody className="py-4 mt-2">
              <div className="d-flex justify-content-center mb-4">
                <img
                  src="/images/home/akshitakamdi.jpg"
                  className="rounded-circle shadow-1-strong"
                  width="100"
                  height="100"
                  alt="profile img"
                />
              </div>
              <h5 className="font-weight-bold">Akshita Kamdi</h5>
              <h6 className="font-weight-bold my-3">
                Full Stack Developer Intern,
                <br />
                P360
              </h6>
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-center"
              >
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
                <li>
                  <MDBIcon fas icon="star" size="sm" color="info" />
                </li>
              </MDBTypography>
              <p className="mb-2">
                <MDBIcon fas icon="quote-left" className="pe-2" />
                The compilation of YouTube videos and the official documentation
                of the MERN in under 4 months program was wonderful and proper.
                It definitely helped me in my placement journey.
              </p>
              <a
                href="https://www.linkedin.com/in/akshita-kamdi-88b98a223/?trk=public_profile_browsemap&originalSubdomain=in"
                className="icon"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/images/logos/link.png"
                  alt="LinkedIn"
                  height={30}
                  width={30}
                />
              </a>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
