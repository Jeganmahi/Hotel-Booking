import React from "react";
import { Card, Table, Badge, Button, Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2';

export default function RoomBookingList({ roomData, roomBooking }) {
  const handleBooking = async (id, status) => {
    if (status === "booked" || status === "check-in") {
      const action = status === "booked" ? "check-in" : "check-out";
      
      // Using SweetAlert for confirmation
      const { value: confirmed } = await Swal.fire({
        icon: 'warning',
        title: `Are you sure you want to change the status to ${action}?`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
      });
      
      if (confirmed) {
        const form = {
          id: id,
          change: action,
        };
        try {
          const response = await fetch(`http://localhost:5001/changeStatus`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
          roomBooking();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <Card>
      <Card.Body className="border-bottom">
        <h2 className="mb-3">Booking Status</h2>
      </Card.Body>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>BookingId</th>
              <th>CHECK IN DATE</th>
              <th>STATUS</th>
              <th>Client mail</th>
              <th>Booking Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roomData.map((data, index) => (
              <tr key={index}>
                <td>{data.bookingId}</td>
                <td>{data.checkIn}</td>
                <td>
                  <Badge variant="warning">{data.bookingStatus}</Badge>
                </td>
                <td>{data.email}</td>
                <td>{data.booking_duration}</td>
                <td>
                  <Button
                    variant={
                      data.bookingStatus === "check-out"
                        ? "secondary"
                        : "primary"
                    }
                    disabled={data.bookingStatus === "check-out"}
                    onClick={() =>
                      handleBooking(data.bookingId, data.bookingStatus)
                    }
                  >
                    {data.bookingStatus === "check-out" ? "out" : "Change"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
