import React from "react";
import { Button, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";

export default function BookingSuccess() {
  const location = useLocation();
  const { formData } = location.state;

  // Calculate total price


  const handleBack = () =>{
    window.location.replace('/');
    window.history.replaceState(null, '', '/');
  }

  console.log("in booking success")
  console.log(formData)

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className="mt-4 shadow-lg rounded" style={{ width: "40rem" }}>
        <Card.Body>
          <img
            src="/images/images.png"
            style={{ height: "10rem", width: "10rem", margin: "auto" }}
            alt="Hotel Image"
            className="mb-4"
          />
           <Row className="mb-3">
            <Col xs={4}>
              <strong>Payment Type:</strong>
            </Col>
            <Col>Debit Card</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <strong>Email Address:</strong>
            </Col>
            <Col>{formData.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <strong>Duration:</strong>
            </Col>
            <Col>{formData.duration}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <strong>Amount Paid:</strong>
            </Col>
            <Col>{formData.price}</Col>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Col xs="auto">
              <Button variant="danger" onClick={handleBack}>Back Home</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
