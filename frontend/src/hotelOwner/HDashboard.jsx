import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import HProfile from "./components/HProfile";
import Footer from "../customer/components/Footer";
import RoomList from "./components/RoomList";
import RoomBookingList from "./components/RoomBookingList";
import { useAuth } from "../AuthContext";

export default function HDashboard() {
  const { user } = useAuth();
  const name = user.username;

  const [profileData, setProfileData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [activeCard, setActiveCard] = useState("profile");
  const [roomListData, setRoomListData] = useState([]);

  useEffect(() => {
    fetchData();
    roomBooking();
    roomFetch();
  }, []);

  const roomFetch = async () => {
    try {
      const response = await fetch(`http://localhost:5001/roomFetch/${name}`);
      const responseData = await response.json();
      setRoomListData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const roomBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/roomBookingData/${name}`
      );
      const responseData = await response.json();
      setRoomData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/fetchHotelData/${name}`
      );
      const responseData = await response.json();
      setProfileData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (card) => {
    setActiveCard(card);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Container fluid className="p-0">
        <Row className="m-0">
          <Col sm={2} className="p-0">
            <Stack
              className="min-vh-100 "
              style={{ backgroundColor: "rgb(7, 68, 152)" }}
            >
              <Card className="mt-5" style={{border:"none"}}
              >
                <Card.Body
                  onClick={() => handleCardClick("profile")}
                  style={{
                    backgroundColor:
                    activeCard === "profile"
                      ? "#007bff"
                      : "rgb(7, 68, 152)",
                  }}
                 
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>View Profile Details</Tooltip>}
                  >
                    <span className="d-inline-flex align-items-center"
                      style={{
                        cursor: "pointer",
                        fontWeight: "bolder",
                        color: "white",
                      }}
                    >
                      <i className="bi bi-person-lines-fill me-2"></i>
                      Hotel Details
                    </span>
                  </OverlayTrigger>
                </Card.Body>
                <Card.Body
                  onClick={() => handleCardClick("booking")}
                  style={{
                    backgroundColor:
                    activeCard === "booking"
                      ? "#007bff"
                      : "rgb(7, 68, 152)",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Booking</Tooltip>}
                  >
                    <span className="d-inline-flex align-items-center"
                     style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      color: "white",
                    }}

                    >
                      <i className="bi bi-building-fill me-2"></i>
                      Bookings
                    </span>
                  </OverlayTrigger>
                </Card.Body>
                <Card.Body
                  onClick={() => handleCardClick("rooms")}
                  style={{
                    backgroundColor:
                    activeCard === "rooms"
                      ? "#007bff"
                      : "rgb(7, 68, 152)",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Rooms</Tooltip>}
                  >
                    <span className="d-inline-flex align-items-center"
                    
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      color: "white",
                    }}
                    
                    >
                      <i className="bi bi-house-fill me-2"></i>
                      Rooms
                    </span>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
            </Stack>
          </Col>
          <Col sm={10} className="p-0">
            <Card className="border-0 rounded-0">
              {activeCard === "profile" && (
                <HProfile profileData={profileData} />
              )}
              {activeCard === "booking" && (
                <RoomBookingList
                  roomBooking={roomBooking}
                  roomData={roomData}
                />
              )}
              {activeCard === "rooms" && (
                <RoomList roomFetch={roomFetch} roomListData={roomListData} />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
