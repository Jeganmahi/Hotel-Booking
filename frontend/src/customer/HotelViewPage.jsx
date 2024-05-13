import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import RoomView from "./components/RoomView";
import Footer from "./components/Footer";

function HotelViewPage() {
  const location = useLocation();
  const { hotelData } = location.state;
  const navigate = useNavigate();
  const hotelName = hotelData.hotelname;
  const [feedBackData, setFeedBackData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [showRoomView, setShowRoomView] = useState(false);
  const hotelid = hotelData.hotelid;
  
  useEffect(() => {
    fetchFeedBack();
  }, []);
  
  const fetchFeedBack = async () => {
    try {
      const hotelname = hotelData.hotelname;
      const response = await fetch(`http://localhost:5001/fetchFeedBack/${hotelname}`);
      const responseData = await response.json();
      setFeedBackData(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleBooking = () => {
    navigate("/bookingPage", { state: { hotelData: hotelData } });
  };
  
  const handleSearch = async () => {
    const formData = {
      hotelName: hotelData.hotelname,
      roomType: roomType,
    };
    try {
      const response = await fetch(`http://localhost:5001/roomSearch`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      setRoomData(responseData);
      setShowRoomView(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  const generateStars = (count) => {
    const stars = [];
    const starColor = count <= 2 ? "red" : "gold";
    
    for (let i = 0; i < count; i++) {
      stars.push(<span key={i} style={{ color: starColor }}>★</span>);
    }
    
    return stars;
  };
  
  return (
    <div className="d-flex flex-column justify-content-between min-vh-100">
      <Container className="mb-3 mt-5">
        <Row>
          <Col xs={12} md={8}>
            <Card>
              <Card.Body>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Select Example</Form.Label>
                  <Form.Control
                    as="select"
                    value={roomType}
                    onChange={(e) => {
                      setRoomType(e.target.value);
                    }}
                  >
                    <option value="">Choose...</option>
                    <option value="normal">Normal</option>
                    <option value="premium">Premium</option>
                    <option value="elite">Elite</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  className="mt-3 mb-3"
                  variant="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
                {showRoomView && <RoomView roomData={roomData} hotelid={hotelid} />}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="border">
              <Card.Header className="bg-primary text-white border-0 rounded-top">USER REVIEWS</Card.Header>
              <Card.Body className="p-0">
                {feedBackData.map((feedback, index) => (
                  <div key={index} className="p-3 border-bottom">
                    <Row className="mb-2">
                      <Col xs={6} className="text-muted">
                        <p className="mb-0">User name:</p>
                      </Col>
                      <Col xs={6}>
                        <p className="mb-0">{feedback.customerName}</p>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col xs={6} className="text-muted">
                        <p className="mb-0">Hotel Rating:</p>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          {generateStars(feedback.hotelRating)}
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col xs={6} className="text-muted">
                        <p className="mb-0">Feedback:</p>
                      </Col>
                      <Col xs={6}>
                        <p className="mb-0">{feedback.hotelfeedback}</p>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default HotelViewPage;
