import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { CardHeader, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Nav } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
function Login() {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("regular");

  const handleOwnerLogin = async () => {
    const form = {
      name: username,
      pass: password,
    };
    console.log(form);
    try {
      const response = await fetch(`http://localhost:5001/OwnerLogin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(response);
      if (response.ok) {
        const userData = { username, password }; // Example user data
        login(userData);
        Swal.fire({
          title: 'Success!',
          text: 'Login success',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      };
        Navigate("/HDashboard");
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomerLogin = async () => {
    const form = {
      name: username,
      pass: password,
    };

    try {
      const response = await fetch(`http://localhost:5001/login`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const userData = { username, password }; // Example user data
        login(userData);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in.",
          confirmButtonColor: "#007bff",
          confirmButtonText: "OK",
        });
        Navigate("/Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MoveToSignUp = () => {
    Navigate("/sign-in");
  };

  return (
    <Stack
      style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}
    >
      <Container
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: "500px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Nav
            variant="tabs"
            defaultActiveKey="regular"
            onSelect={(selectedTab) => setActiveTab(selectedTab)}
          >
            <Nav.Item>
              <Nav.Link eventKey="regular">Regular User</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="owner">Hotel Owner</Nav.Link>
            </Nav.Item>
          </Nav>
          <Card.Body>
            <Container className="d-flex justify-content-center">
              <Card.Title
                className="mb-5"
                style={{
                  fontSize: "2rem",
                  color: "rgb(7, 68, 152)",
                  fontWeight: "bolder",
                }}
              >
                Welcome Back
              </Card.Title>
            </Container>
            {activeTab === "regular" && (
              <Form style={{ maxWidth: "400px", margin: "0 auto" }}>
                <ToastContainer />
                <Form.Group className="mb-3" controlId="regularEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    style={{ height: "50px", fontSize: "18px" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="regularPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    style={{ height: "50px", fontSize: "18px" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  style={{
                    width: "100%",
                    height: "50px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    background: "rgb(7, 68, 152)",
                  }}
                  className="mb-3"
                  onClick={handleCustomerLogin}
                >
                  Sign In
                </Button>
                <p className="text-center mb-3">
                  Don't have an account?{" "}
                  <span
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={MoveToSignUp}
                  >
                    Sign up
                  </span>
                </p>
              </Form>
            )}
            {activeTab === "owner" && (
              <Form>
                {console.log(ToastContainer)}
                <ToastContainer />
                <Form.Group className="mb-5" controlId="ownerEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    style={{ height: "50px", fontSize: "20px", width: "100%" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="ownerPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    style={{ height: "50px", fontSize: "20px" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  style={{
                    width: "100%",
                    height: "50px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    background: "rgb(7, 68, 152)",
                  }}
                  className="mb-3"
                  onClick={handleOwnerLogin}
                >
                  Sign In
                </Button>
              </Form>
            )}
            <Stack></Stack>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </Stack>
  );
}

export default Login;
