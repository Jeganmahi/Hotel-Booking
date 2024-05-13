import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function RoomView({ roomData ,hotelid}) {
  console.log(hotelid)
  const [dataLoaded, setDataLoaded] = useState(false);
  console.log(roomData)
  useEffect(() => {
    fetchRoomImages();
  }, []);

  const fetchRoomImages = async () => {
    for (const room of roomData) {
      try {
        const response = await fetch(
          `http://localhost:5001/uploads/${room.room_images}`
        );
        room.room_images = response.url;
      } catch (error) {
        console.error(`Error fetching image for room: ${room.id}`, error);
      }
    }
    setDataLoaded(true); // Set dataLoaded to true when fetching is completed
  };

  const navigate = useNavigate();
  const handleBooking = (room) => {
    console.log(room);
    navigate("/bookingPage", { state: { room: room,hotelid:hotelid } });
  };

  return (
    <div>
      <Card className="shadow-lg border-0">
        <Card.Header
          className="d-flex justify-content-center align-items-center"
          style={{ background: "rgb(7, 68, 152)" }}
        >
          <h4
            className="m-0"
            style={{
              color: "white",
              fontSize: "2rem",
              fontWeight: "bolder",
            }}
          >
            Available Rooms
          </h4>
        </Card.Header>
        <Card.Body>
          {/* Render the content only if dataLoaded is true */}
          {dataLoaded &&
            roomData.map((room, index) => (
              <Row key={index} className="mb-4">
                <Col xs={12} md={4}>
                  <img
                    src={room.room_images}
                    alt="Room"
                    className="img-fluid rounded"
                  />
                </Col>
                <Col xs={12} md={8}>
                  <Row className="mb-3">
                    <Col xs={6} md={4}>
                      <strong>Room Size:</strong>
                    </Col>
                    <Col xs={6} md={8}>
                      {room.room_size}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} md={4}>
                      <strong>Bed Count:</strong>
                    </Col>
                    <Col xs={6} md={8}>
                      {room.bed_count}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} md={4}>
                      <strong>Maximum Booking Period (in days):</strong>
                    </Col>
                    <Col xs={6} md={8}>
                      {room.maximum_duration}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} md={4}>
                      <strong>Minimum Booking Period (in days):</strong>
                    </Col>
                    <Col xs={6} md={8}>
                      {room.minimum_duration}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} md={4}>
                      <strong>Amenities:</strong>
                    </Col>
                    <Col xs={6} md={8}>
                      {room.amentities}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={6} md={4}>
                      <strong>Price per Day:</strong>
                    </Col>
                    <Col xs={6} md={8}>
                      {room.price_per_day}
                    </Col>
                  </Row>
                </Col>
                <Row>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "rgb(7, 68, 152)",
                      fontWeight: "bold",
                    }}
                    className="mb-2"
                    onClick={() => {
                      handleBooking(room);
                    }}
                  >
                    Book room
                  </Button>
                </Row>
              </Row>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
}
