import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useAuth } from "../../AuthContext";
import Swal from "sweetalert2";
export default function ProfileUpdateModal({ show, handleCloseModal,handleRefresh }) {
  const {user } = useAuth();
  const email = user.username;
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchData(email);
  }, []);

  const fetchData = async (email) => {
    const response = await fetch(
      `http://localhost:5001/fetchProfileData/${email}`
    );
    const responseData = await response.json();
    setData(responseData);
  };
  const handleUpdate = async () => {
    console.log(data);
    try {
      const response = await fetch(
        `http://localhost:5001/handleUpdate/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Profile updated",
        confirmButtonColor: "#007bff",
        confirmButtonText: "OK",
        allowOutsideClick: false, // Prevents closing on outside click
        allowEscapeKey: false, // Prevents closing with escape key
        allowEnterKey: true, // Allows closing with Enter key
        focusConfirm: false, // Doesn't focus on confirm button after opening
        preConfirm: () => {
          window.location.reload(); // Reload the page
        }
      });
    
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PROFILE</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
            <Form.Control
              defaultValue={data.fname}
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, fname: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
            <Form.Control
              defaultValue={data.lname}
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, lname: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Date of Birth</InputGroup.Text>
            <Form.Control
              defaultValue={data.dob}
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, dob: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Nationality</InputGroup.Text>
            <Form.Control
              defaultValue={data.nationality}
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, nationality: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
            <Form.Control
              defaultValue={data.phonenumber}
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setData({ ...data, phonenumber: e.target.value });
              }}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
