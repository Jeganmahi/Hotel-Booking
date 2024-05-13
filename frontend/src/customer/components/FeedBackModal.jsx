import React, { useEffect, useState } from "react";
import { Container, Form, Modal, InputGroup, Button } from "react-bootstrap";
import { useAuth } from "../../AuthContext";

import Swal from "sweetalert2";
export default function FeedBackModal({
  FeedModal,
  handleCloseModal,
  id,
  fetchBookingData,
}) {
  useEffect(() => {
    FetchHotelName();
  }, []);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    hotelRating: 0,
    platformRating: 0,
    hotelFeed: "",
    platFormFeed: "",
    bookingId: id,
    hotel: "",
    email: user.username,
  });

  const [hotelName, setHotelName] = useState([]);

  const FetchHotelName = async () => {
    const response = await fetch(`http://localhost:5001/fetchHotel`);
    const responseData = await response.json();
    setHotelName(responseData);
    // setFormData({...formData,bookingId:id}) // Update the state with responseData
  };

  const handleSubmit = async () => {
    // console.log(id)
    formData.bookingId = id;

    console.log(formData);
    try {
      const response = await fetch(`http://localhost:5001/feedBackSubmit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        Swal.fire({
          title: "Done",
          text: "Feed back given",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      //handleRefresh()
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Modal show={FeedModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Feed Back</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label htmlFor="hotelSelect">Select Hotel:</label>
          <Form.Select
            className="mb-4"
            aria-label="Hotel Feed Back Rating"
            onChange={(e) => {
              setFormData({ ...formData, hotel: e.target.value });
            }}
          >
            <option>Select the hotel name</option>
            {hotelName?.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            className="mb-4"
            aria-label="Hotel Feed Back Rating"
            onChange={(e) => {
              setFormData({ ...formData, hotelRating: e.target.value });
            }}
          >
            <option>Hotel Star Rating</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
          </Form.Select>
          <Form.Select
            className="mb-3"
            aria-label="Hotel Feed Back Rating"
            onChange={(e) => {
              setFormData({ ...formData, platformRating: e.target.value });
            }}
          >
            <option>Platform Star Rating</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
          </Form.Select>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            onChange={(e) => {
              setFormData({ ...formData, hotelFeed: e.target.value });
            }}
          >
            <Form.Label>Hotel Feed Back</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            onChange={(e) => {
              setFormData({ ...formData, platFormFeed: e.target.value });
            }}
          >
            <Form.Label>Platform Feed Back</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
