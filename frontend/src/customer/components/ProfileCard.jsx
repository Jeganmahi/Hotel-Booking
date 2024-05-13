import React from "react";
import { Button, Card, Form, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../AuthContext";

export default function ProfileCard({ profileData, handleOpenModal }) {
  const { user} = useAuth();
  console.log(user.username)
  return (
    <Card>
      <Card.Body className="border">
        <p className="mb-2" style={{fontSize:"1.5rem",fontWeight:"bolder"}}>Perosnal Details</p>
        <p style={{color:"GrayText"}}>Keep your details up-to-date for quality service</p>
      </Card.Body>
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <Form.Label style={{color:"GrayText"}}>User Name:</Form.Label>
          </Col>
          <Col>
            <Form.Label>{profileData.fname}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label style={{color:"GrayText"}}>Last Name</Form.Label>
          </Col>
          <Col>
            <Form.Label>{profileData.lname}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label style={{color:"GrayText"}}>Date of Birth</Form.Label>
          </Col>
          <Col>
            <Form.Label>{profileData.dob}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label style={{color:"GrayText"}}>Email Address</Form.Label>
          </Col>
          <Col>
            <Form.Label>{profileData.email}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label style={{color:"GrayText"}}>Phone Number</Form.Label>
          </Col>
          <Col>
            <Form.Label>{profileData.phonenumber}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label style={{color:"GrayText"}}>Nationality:</Form.Label>
          </Col>
          <Col>
            <Form.Label>{profileData.nationality}</Form.Label>
          </Col>
        </Row>
      </Card.Body>
      <Container style={{ background: "rgb(0,0,0,0.1)", height: "80px", paddingTop: "20px" }} className="">
  <Button
    variant="primary"
    style={{
      color: "white",
      backgroundColor: "rgb(44, 130, 201)",
      fontWeight: "bold",
      width:"80px"
    }}
    onClick={handleOpenModal}
  >
    Edit
  </Button>
</Container>

    </Card>
  );
}
