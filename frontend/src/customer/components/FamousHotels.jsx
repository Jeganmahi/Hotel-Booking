import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function FamousHotels() {
  const [data, setData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchFamousData();
  }, []);

  const fetchFamousData = async () => {
    try {
      const response = await fetch("http://localhost:5001/fetchFamousHotels");
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBook = (hotel) => {
    console.log(hotel)
    Navigate('/hotelPage',{state:{hotelData:hotel}})
    
  }

  return (
    <Container>
      <Row className="mb-5 mt-3 d-flex justify-content-center align-items-center">
        <h1 className="text-center">Handpicked Nearby Hotels for You</h1>
      </Row>
      {data.map((hotel, index) => (
        <Card key={index} className="mb-4 shadow border-0">
          <Row className="align-items-center">
            <Col xs={12} md={4}>
              <Card.Img src={hotel.hotelImage} alt={hotel.hotelName} />
            </Col>
            <Col xs={12} md={8}>
              <Card.Body>
                <Card.Title className="mb-3 text-primary">
                  {hotel.hotelName}
                </Card.Title>
                <Card.Text className="mb-2">
                  <strong>About:</strong>
                </Card.Text>
                <Card.Text className="mb-4">{hotel.about}</Card.Text>
                <Card.Text className="mb-2">
                  <strong>Address:</strong>
                </Card.Text>
                <Card.Text className="mb-4">{hotel.address}</Card.Text>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <StarRating rating={hotel.ratings} />
                  </div>
                  <Button variant="primary" className="px-4 py-2" onClick={() => {
                    handleBook(hotel);
                  }}>
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
}

// Component to render star ratings
const StarRating = ({ rating }) => {
  const stars = [];

  // Create an array of stars based on the rating value
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <span key={i} style={{ color: "#F26A2E", fontSize: "1.5rem" }}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} style={{ color: "#E2E8F0", fontSize: "1.5rem" }}>
          ★
        </span>
      );
    }
  }

  return <div className="d-flex">{stars}</div>;
};
