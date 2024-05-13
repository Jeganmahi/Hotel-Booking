import React from "react";
import { Nav, Container, Row, Col, Card, FormText, Button } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import "./components-styling/homePage.css";

function Home() {
  const { user, logout } = useAuth();

  return (
    <Container
      className="shadow"
      fluid
      style={{ backgroundColor: "rgb(7, 68, 152)" }}
    >
      <Card style={{ background: "rgb(51, 45, 220)" }}>
        <Row className="shadow" style={{ background: "rgb(7, 68, 152)" }}>
          <Col className="d-flex justify-content-start">
            <FormText
              style={{
                backgroundColor: "rgb(7, 68, 152)",
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "white",
                marginTop: "20px",
              }}
            >
              ROOM BOOKING APP
            </FormText>
          </Col>
          <Col>
            {/* Conditionally render navigation items based on authentication status */}
            {user ? (
              <Col className=" mt-1 d-flex  justify-content-end">
                <Button onClick={logout} href="/" variant="danger">
                  Logout
                </Button>
              </Col>
            ) : (
              <Nav fill variant="tabs" style={{ borderBottom: "none" }}>
                <Nav.Item>
                  <Nav.Link
                    href="/"
                    className="nav-link"
                    style={{ color: "white", fontSize: "1.2rem" }}
                  >
                    Hotels
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/login"
                    className="nav-link"
                    style={{ color: "white", fontSize: "1.2rem" }}
                  >
                    Login/Register
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/about"
                    className="nav-link"
                    style={{ color: "white", fontSize: "1.2rem" }}
                  >
                    About
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Home;
