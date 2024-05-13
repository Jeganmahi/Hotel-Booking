import React, { useEffect, useMemo } from "react";
import { Button, Card, CardBody, Container } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import FeedBackModal from "./FeedBackModal";
import { useAuth } from "../../AuthContext";
import { useTable, useSortBy } from "react-table";
export default function BookingViewCard() {
  const [show, setShow] = useState(false);
  const [FeedModal, setFeedModal] = useState(false);
  const [data, setData] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const email = user.username;
  useEffect(() => {
    fetchBookingData(email);
  }, []);
  const handleCloseModal = () => {
    setShow(false);
    setFeedModal(false);
    fetchBookingData(email);
  };
  const fetchBookingData = async (email) => {
    console.log("vanakkam");
    const response = await fetch(
      `http://localhost:5001/fetchBookingData/${email}`
    );
    const responseData = await response.json();
    setBookingData(responseData);
  };
  const handleOpenModal = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `http://localhost:5001/hotelBookingData/${id}`
      );
      const responseData = await response.json();
      setData(responseData);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  const [fid, setFid] = useState("");
  const handleFeedBack = (id) => {
    setFid(id);
   
    setFeedModal(true);
  };
  const showFeedBack = (status, bookingStatus, bookingId) => {
    if (status === "not given" && bookingStatus === "check-out") {
      return (
        <Button variant="success" onClick={() => handleFeedBack(bookingId)}>
          Give FeedBack
        </Button>
      );
    } else if (status === "given") {
      return <Badge variant="success">GIVEN</Badge>;
    } else {
      return (
        <Button
          variant="secondary"
          onClick={() => handleFeedBack(bookingId)}
          disabled
        >
          Give FeedBack
        </Button>
      );
    }
  };
  const filteredData = useMemo(() => {
    console.log("Booking Data:", bookingData);
    console.log("Search Value:", searchValue);
    return bookingData.filter((item) =>
      item.hotelName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [bookingData, searchValue]);

  return (
    <Card>
      <Card.Body className="border d-flex justify-content-center">
        <p
          className="mb-2"
          style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
        >
          BOOKING STATUS
        </p>
      </Card.Body>
      <Card.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="search-addon">Search</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by hotel name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>HOTEL NAME</th>
              <th>CHECK IN DATE</th>
              <th>STATUS</th>
              <th>INFO</th>
              <th>FEED BACK</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td>{data.hotelName}</td>
                <td>{data.checkIn}</td>
                <td>
                  <Badge variant="warning">{data.bookingStatus}</Badge>
                </td>

                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleOpenModal(data.bookingId)}
                  >
                    VIEW
                  </Button>
                </td>
                <td>
                  {showFeedBack(
                    data.feedBackStatus,
                    data.bookingStatus,
                    data.bookingId
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>UPDATE PROFILE</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup className="mb-4">
              <InputGroup.Text>HOTEL NAME</InputGroup.Text>
              <Form.Control
                type="text"
                aria-label="With textarea"
                defaultValue={data.hotelName}
                disabled
              ></Form.Control>
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>Card name</InputGroup.Text>
              <Form.Control
                type="text"
                aria-label="With textarea"
                defaultValue={data.cardName}
                disabled
              ></Form.Control>
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>CHECK IN DATE</InputGroup.Text>
              <Form.Control
                type="text"
                aria-label="With textarea"
                defaultValue={data.checkIn}
                disabled
              ></Form.Control>
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>CHECK OUT DATE</InputGroup.Text>
              <Form.Control
                type="text"
                aria-label="With textarea"
                defaultValue={data.checkOut}
                disabled
              ></Form.Control>
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>Booking Duration</InputGroup.Text>
              <Form.Control
                type="text"
                aria-label="With textarea"
                defaultValue={data.booking_duration}
                disabled
              ></Form.Control>
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>BOOKING STATUS</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                defaultValue={data.bookingStatus}
                disabled
              ></Form.Control>
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <FeedBackModal
          handleCloseModal={handleCloseModal}
          FeedModal={FeedModal}
          id={fid}
          fetchBookingData={fetchBookingData}
        />
      </Card.Body>
    </Card>
  );
}
