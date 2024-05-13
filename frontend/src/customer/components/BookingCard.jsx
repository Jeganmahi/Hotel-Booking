import React, { useState } from "react";
import { Card, Form, Button, FormControl, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Swal from "sweetalert2";

export default function BookingCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { room, hotelid } = location.state;
  const maxTime = parseInt(room.maximum_duration);
  const minTime = parseInt(room.minimum_duration);
  const [formData, setFormData] = useState({
    hotelName: room.hotel_name,
    hotelid: hotelid,
    roomId: room.room_id,
    email: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    pin: "",
    checkin: "",
    checkout: "",
  });

  const handleBooking = async () => {
    const checkinDate = new Date(formData.checkin);
    const checkoutDate = new Date(formData.checkout);
    const differenceInMs = checkoutDate - checkinDate;
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const price = differenceInDays * parseInt(room.price_per_day);
    formData.price = price;
    formData.duration = differenceInDays;

    if (
      formData.email === "" ||
      formData.cardName === "" ||
      formData.cardNumber === "" ||
      formData.expiryDate === "" ||
      formData.cvv === "" ||
      formData.address === "" ||
      formData.city === "" ||
      formData.city === "" ||
      formData.checkin === "" ||
      formData.checkout === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields",
      });
    } else if (differenceInDays > maxTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Room can only be booked for ${maxTime} days but you have booked for ${differenceInDays} days`,
      });
    } else if (differenceInDays < minTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Room should be booked for at least ${minTime} days`,
      });
    } else {
      try {
        const response = await fetch(`http://localhost:5001/roomBooking`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Room successfully booked",
            
          });

          navigate("/bookingSuccess", { state: { formData: formData } });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-vh-100">
      <Container className="d-flex justify-content-center mb-5">
        <Card className="mt-4 shadow-lg rounded" style={{ width: "650px" }}>
          <Card.Header className="bg-success text-white fw-bold text-center">
            Booking Confirmation
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCheckin" className="mb-3">
                <Form.Label>Check-in Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setFormData({ ...formData, checkin: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCheckout" className="mb-3">
                <Form.Label>Check-out Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setFormData({ ...formData, checkout: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formExpiryDate" className="mb-3">
                <Form.Label>Expiry Date (MM/YY)</Form.Label>
                <FormControl
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCardName" className="mb-3">
                <Form.Label>Name on Card</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, cardName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCardNumber" className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <FormControl
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  maxLength={19}
                  placeholder="0000 0000 0000 0000"
                />
              </Form.Group>
              <Form.Group controlId="formCvv" className="mb-3">
                <Form.Label>CVV</Form.Label>
                <FormControl
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, cvv: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label>Customer Address</Form.Label>
                <FormControl
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCity" className="mb-3">
                <Form.Label>City</Form.Label>
                <FormControl
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPin" className="mb-3">
                <Form.Label>Customer PIN code</Form.Label>
                <FormControl
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, pin: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="success"
                className="mb-3 w-100"
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}
