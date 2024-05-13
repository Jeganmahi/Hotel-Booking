import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";

export default function HProfile({ profileData }) {
  return (
    <Card className="p-4 border-0" style={{ background: "#f9f9f9" }}>
      <div className="mb-4">
        <h2 className="mb-3" style={{ fontWeight: "bold", color: "#333" }}>
          Personal Details
        </h2>
        <p className="text-muted mb-0">
          Keep your details up-to-date for quality service
        </p>
      </div>
      <div>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold" style={{ color: "#4caf50" }}>
              Hotel Image:
            </Form.Label>
          </Col>
          <Col xs={12} md={9}>
            <img
              src={profileData.hotelImage}
              alt="Hotel"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold" style={{ color: "#4caf50" }}>
              Hotel Name:
            </Form.Label>
          </Col>
          <Col xs={12} md={9}>
            <Form.Label>{profileData.hotelname}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold" style={{ color: "#4caf50" }}>
              Location:
            </Form.Label>
          </Col>
          <Col xs={12} md={9}>
            <Form.Label>{profileData.location}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold" style={{ color: "#4caf50" }}>
              Address:
            </Form.Label>
          </Col>
          <Col xs={12} md={9}>
            <Form.Label>{profileData.address}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold" style={{ color: "#4caf50" }}>
              Email Address:
            </Form.Label>
          </Col>
          <Col xs={12} md={9}>
            <Form.Label>{profileData.email}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold" style={{ color: "#4caf50" }}>
              Phone Number:
            </Form.Label>
          </Col>
          <Col xs={12} md={9}>
            <Form.Label>{profileData.phonenumber}</Form.Label>
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold" style={{ color: "#4caf50" }}>
              Ratings:
            </Form.Label>
          </Col>
          <Col xs={12} md={9}>
            <Form.Label>{profileData.ratings}</Form.Label>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
