import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import myface from "./formal.jpeg";
import comp249 from "../pdf/Comp249.pdf";
import comp352 from "../pdf/COMP352.pdf";
import soen228 from "../pdf/SOEN228.pdf";
import comp348 from "../pdf/comp348.pdf";
import engr213 from "../pdf/ENGR213.pdf";

export default function AboutPage() {
  return (
    <Container fluid className="rounded-border-black-bg">
      <h1>About this project</h1>
      <br></br>
      <Row>
        <Col md={4}>
          <img src={myface} id="myface" alt="Huynh Minh profile picture"></img>
        </Col>
        <Col md={8}>
          <h6>
            My name is Huynh Minh and I am a first year Software Engineering
            student at Concordia University.<br></br>
            <br></br>The goal of this project is to create a fully functional
            ecommerce website using the MERN stack (MongoDB, Express, React,
            NodeJs). I wanted to go beyond the
            <a href="  https://fifty-ten.herokuapp.com" className="turquoise">
              {" "}
              basic website
            </a>
            &nbsp;we did for our web programming course.<br></br>
            <br></br>The design is inspired by the idea of a dark theme (which
            is superior to the light theme) to Amazon.com, the project is in
            active development and updates can be found on{" "}
            <a
              href="https://github.com/vibqetowi/DarkRiver"
              className="turquoise"
            >
              {" "}
              this repository.
            </a>
            <br></br>
            <br></br>
            Beyond web development, my skills include:
            <ul className="about-page-list">
              <li>
                <a className="turquoise" href={comp249}>
                  Object Oriented Programming in Java
                </a>
              </li>
              <li>
                <a className="turquoise" href={comp352}>
                  Data Structures and Algorithms in Java
                </a>
              </li>
              <li>
                <a className="turquoise" href={soen228}>
                  Basic System Hardware Knowledge
                </a>
              </li>
              <li>
                <a className="turquoise" href={comp348}>
                  Basic Understaing of C#, LISP, PROLOG, LINQ, Python
                </a>
              </li>
              <li>
                <a className="turquoise" href={engr213}>
                  Differential Equations
                </a>
              </li>
            </ul>
            <br></br>Our team of 4 placed 2nd in the internal{" "}
            <a
              href="https://www.engcomm.ca/concordia-university"
              className="turquoise"
            >
              EngComm X Concordia
            </a>{" "}
            case competition where we had to design a commercially viable
            solution to a case and then propose a plan to bring it to market.
            <br></br>
            <br></br>
            The contact form is pending implementation, meanwhile I can be
            contacted through the information on my CV or at{" "}
            <a
              className="turquoise"
              href="mailto:admin.darkriver@encryptedmail.anonaddy.com"
            >
              admin.darkriver@encryptedmail.anonaddy.com
            </a>
          </h6>
        </Col>
      </Row>
    </Container>
  );
}
