import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Footer from "./customer/components/Footer";

const About = () => {
  return (
    <>
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col>
              <h2 className="text-center mb-3">About Us</h2>
              <p className="text-center">
                Welcome to this Room Booking App, where we are dedicated to providing you
                with the best experience for booking room for start stays around the world. Our
                mission is to make your short stays comfortable, convenient, and
                memorable.
              </p>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <h3 className="text-center mb-3">Our Vision</h3>
              <p className="text-center">
                At Room Booking App, we envision a world where every person finds
                the perfect accommodation that suits their needs and preferences.
                We aim to simplify the room booking process, offering a wide
                range of options for every budget.
              </p>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <h3 className="text-center mb-3">Why Choose Us?</h3>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />
                  Our structured booking process allows you to quickly reserve your short stay room online, saving you time and hassle.
                </li>
                <li className="mb-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />
                  Whether you need a room for a few hours or a single night, we offer flexible booking options to accommodate your schedule.
                </li>
                <li className="mb-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />
                  Rest assured that all our short stay rooms meet high standards of cleanliness and comfort, ensuring a pleasant experience during your brief visit.
                </li>
                <li className="mb-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />
                  Our friendly customer support team is available around the clock to assist you with any questions or concerns before, during, or after your stay.
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <h3 className="text-center mb-3">Contact Us</h3>
              <p className="text-center">
                Have questions or need assistance? Feel free to reach out to our
                customer support team at{" "}
                <a href="mailto:info@staybooker.com">jeganvc2004@gmail.com</a>. We're here to help!
              </p>
              <p className="text-center">
                <Button variant="success" href="mailto:info@staybooker.com">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Email Us
                </Button>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default About;
