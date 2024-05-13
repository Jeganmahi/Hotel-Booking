import React from "react";
import { Col, Container, Row, Card, CardBody } from "react-bootstrap";
import { FaUser, FaFlag, FaBook, FaCheckCircle } from "react-icons/fa"; // Importing icons from react-icons library

export default function DashboardCards({ profileData, totalLength, checkoutCount }) {
  return (
    <Container>
      <Row className="mt-4">
        {/* Welcome Card */}
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>WELCOME</Card.Title>
              <FaUser className="ml-2" style={{ color: "#FF8C00", fontSize: "2rem" }} />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">
              <p className="mb-0" style={{ fontSize: "1.2rem" }}>{profileData.fname}</p>
            </CardBody>
          </Card>
        </Col>
        
        {/* Nationality Card */}
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>NATIONALITY</Card.Title>
              <FaFlag className="ml-2" style={{ color: "#FF5733", fontSize: "2rem" }} />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">
              <p className="mb-0" style={{ fontSize: "1.2rem" }}>{profileData.nationality}</p>
            </CardBody>
          </Card>
        </Col>
        
        {/* Bookings Card */}
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>BOOKINGS</Card.Title>
              <FaBook className="ml-2" style={{ color: "#C70039", fontSize: "2rem" }} />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">
              <p className="mb-0" style={{ fontSize: "1.2rem" }}>{totalLength}</p>
            </CardBody>
          </Card>
        </Col>
        
        {/* Check-out Card */}
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>Check-out</Card.Title>
              <FaCheckCircle className="ml-2" style={{ color: "#900C3F", fontSize: "2rem" }} />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">
              <p className="mb-0" style={{ fontSize: "1.2rem" }}>{checkoutCount}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
