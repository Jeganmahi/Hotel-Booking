import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HotelCard({ hotelListData }) {
  const navigate = useNavigate();
  const handleBooking = (data) => () => {
    console.log(data);
    // Navigate to another page with the data
    navigate("/hotelPage", { state: { hotelData: data } });
  };

  // Call navigate when component is mounted
  useEffect(() => {
    // Optionally, you can put navigation logic here if needed when component mounts
  }, []);

  return (
    <Row xs={1} md={2} lg={3} className="g-4" style={{ marginBottom: "20px" }}>
      {hotelListData.map((data, index) => (
        <Col key={index}>
          <Card
            style={{
              width: "18rem",
              marginBottom: "20px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            <Card.Img
              variant="top"
              src={data.hotelImage}
              style={{ height: "100px" }}
            />
            <Card.Body
              style={{ justifyContent: "center", alignContent: "center" }}
            >
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Hotel Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={data.hotelname}
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Hotel Address</Form.Label>
                  <Form.Control as="textarea" rows={3} disabled>
                    {data.address}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Available Rooms</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={data.roomCount}
                    disabled
                  />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={handleBooking(data)}>
                View Rooms
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default HotelCard;
