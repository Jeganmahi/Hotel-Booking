import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Stack,
} from "react-bootstrap";
import ProfileCard from "./components/ProfileCard";
import BookingCard from "./components/BookingCard";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import BookingViewCard from "./components/BookingViewCard";
import { Tooltip } from "react-bootstrap";
import Footer from "./components/Footer";
import { useAuth } from "../AuthContext";
import DashboardCards from "./components/DashboardCards";

function Dashboard() {
  const { user } = useAuth();
  const email = user.username;
  let checkoutCount = 0;
  const [checkout, setCheckout] = useState();
  const [totalLength, setTotalLength] = useState();

  const [profileData, setProfileData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [show, setShow] = useState(false);
  const [activeCard, setActiveCard] = useState("dashboard");

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleOpenModal = () => {
    setShow(true);
    fetchBookingData();
  };

  const handleCardClick = (card) => {
    setActiveCard(card);
  };

  useEffect(() => {
    fetchData(email);
    fetchBookingData(email);
  }, []);

  const fetchData = async (email) => {
    const response = await fetch(
      `http://localhost:5001/fetchProfileData/${email}`
    );
    const responseData = await response.json();
    setProfileData(responseData);
  };

  const fetchBookingData = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5001/fetchBookingData/${email}`
      );
      const responseData = await response.json();
      setBookingData(responseData);

      // Now that bookingData has been updated, you can safely access its properties
      responseData.forEach((data) => {
        if (data.bookingStatus === "check-out") {
          checkoutCount++;
        }
      });
      setTotalLength(bookingData.length);
      setCheckout(checkoutCount)
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <Container fluid style={{ minHeight: "100vh", padding: "0" }}>
        <Row style={{ margin: "0" }}>
          <Col sm={2} style={{ padding: "0" }}>
            <Stack
              style={{ minHeight: "100vh", backgroundColor: "rgb(7, 68, 152)" }}
            >
              <Card
                className="mt-5"
                style={{
                  backgroundColor: "rgb(7, 68, 152))",
                  border: "none",
                  marginBottom: "0",
                }}
              >
                <Card.Body
                  onClick={() => handleCardClick("dashboard")}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      activeCard === "dashboard"
                        ? "#007bff"
                        : "rgb(7, 68, 152)",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Dashboard</Tooltip>}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontWeight: "bolder",
                        color: "white",
                      }}
                    >
                      <i
                        className="bi bi-ui-checks-grid"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Dashboard
                    </span>
                  </OverlayTrigger>
                </Card.Body>
                <Card.Body
                  onClick={() => handleCardClick("profile")}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      activeCard === "profile" ? "#007bff" : "rgb(7, 68, 152)",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>View Profile Details</Tooltip>}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontWeight: "bolder",
                        color: "white",
                      }}
                    >
                      <i
                        className="bi bi-person-lines-fill"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Profile Details
                    </span>
                  </OverlayTrigger>
                </Card.Body>
                <Card.Body
                  onClick={() => handleCardClick("booking")}
                  style={{
                    backgroundColor:
                      activeCard === "booking" ? "#007bff" : "rgb(7, 68, 152)",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Booking</Tooltip>}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontWeight: "bolder",
                        color: "white",
                      }}
                    >
                      <i
                        className="bi bi-building-fill"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Bookings
                    </span>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
            </Stack>
          </Col>
          <Col style={{ padding: "0" }}>
            <Container>
              <Card className="mt-5" style={{ border: "none" }}>
                {activeCard === "profile" && (
                  <ProfileCard
                    profileData={profileData}
                    handleOpenModal={handleOpenModal}
                  />
                )}
                {activeCard === "booking" && (
                  <BookingViewCard bookingData={bookingData} />
                )}
                {activeCard === "dashboard" && (
                  <DashboardCards
                    totalLength={bookingData.length}
                    profileData={profileData}
                    checkoutCount={checkout}
                  />
                )}
                <ProfileUpdateModal
                  handleCloseModal={handleCloseModal}
                  handleRefresh={fetchData}
                  show={show}
                />
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
