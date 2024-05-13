import React, { useState, useEffect } from "react";
import { Container, Card, Badge } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import HotelCard from "./components/HotelCard";
import Footer from "./components/Footer";
import FamousHotels from "./components/FamousHotels";
import Swal from "sweetalert2";
import { FiMapPin, FiLayers } from 'react-icons/fi'; // Import icons

export default function HomePage() {
  const [hotelData, setHotelData] = useState([]);
  const [hotelListData, setHotelListData] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = async () => {
    setHotelData({
      ...hotelData,
      minPrice,
      maxPrice,
    });
    console.log(hotelData);

    try {
      const response = await fetch(`http://localhost:5001/handleFilter`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelData),
      });
      const responseData = await response.json();

      setHotelListData(responseData);
      setSearchClicked(true);
      setShowResults(true); // Set searchClicked to true when search button is clicked
      alert("success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    console.log(hotelData);

    try {
      const response = await fetch(`http://localhost:5001/handleSearch`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelData),
      });
      const responseData = await response.json();

      setHotelListData(responseData);
      setSearchClicked(true);
      setShowResults(true); // Set searchClicked to true when search button is clicked
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(hotelListData); // Log hotelListData whenever it changes
  }, [hotelListData]);

  const callHotelCard = () => {
    console.log("call");

    if (hotelListData.length > 0) {
      return <HotelCard hotelListData={hotelListData} />;
    } else {
      return (
        <p>
          <img src="/images/notfound.png"></img>
        </p>
      );
    }
  };

  const handleClear = () => {
    setMaxPrice("");
    setMinPrice("");
  };

  return (
    <div className="d-flex justify-content-center">
            <Stack>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "rgb(7, 68, 152)",
                        height: "100px",
                        width: "100vw",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    Discover your perfect stay around the globe.
                </div>
                <div
                    className="p-2 d-flex justify-content-center"
                    style={{ width: "100%", background: "rgb(7, 68, 152)" }}
                >
                    {!searchClicked && (
                        <Container className="mb-5">
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="inputLocation" style={{ color: "white" }}>
                                        <FiMapPin style={{ marginRight: '5px' }} /> LOCATION
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="inputLocation"
                                        placeholder="Enter Location"
                                        aria-describedby="locationHelpBlock"
                                        onChange={(e) => {
                                            setHotelData({ ...hotelData, location: e.target.value });
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="inputRoomCount" style={{ color: "white" }}>
                                        <FiLayers style={{ marginRight: '5px' }} /> NO OF ROOMS
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="inputRoomCount"
                                        aria-describedby="roomCountHelpBlock"
                                        onChange={(e) => {
                                            setHotelData({ ...hotelData, roomCount: e.target.value });
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Button
                                    className="mt-4"
                                    style={{ width: "200px" }}
                                    variant="warning"
                                    onClick={handleSearch}
                                >
                                    SEARCH
                                </Button>
                            </Row>
                        </Container>
                    )}
                </div>
                {searchClicked && (
                    <div
                        className="p-4"
                        style={{
                            marginTop: "50px",
                            marginLeft: "20px",
                            marginRight: "20px",
                            marginBottom: "20px",
                        }}
                    >
                        <Row>
                            <Col xs={12} md={8}>
                                <Container>
                                    <div style={{ padding: "20px" }}>
                                        {callHotelCard()} {/* Assuming this function renders hotel cards */}
                                    </div>
                                </Container>
                            </Col>
                        </Row>
                    </div>
                )}
                {!searchClicked && (
                    <>
                        <FamousHotels />
                    </>
                )}
                <Footer />
            </Stack>
        </div>
  );
}
