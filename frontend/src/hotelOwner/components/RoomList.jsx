import React, { useState } from "react";
import {
  Card,
  Table,
  Badge,
  Button,
  InputGroup,
  Form,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Swal from 'sweetalert2';
import { useAuth } from "../../AuthContext";
import RoomViewModal from "./RoomViewModal";
export default function RoomList({ roomListData, roomFetch }) {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const { user } = useAuth();
  const [roomId, setRoomId] = useState("");
  const [file, setFile] = useState(null);
  const hotelname = user.username;

const handleAddSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("room_id", roomId);
    formData.append("room_size", data.room_size);
    formData.append("bed_count", data.bed_count);
    formData.append("maximum_duration", data.maximum_duration);
    formData.append("minimum_duration", data.minimum_duration);
    formData.append("price_per_day", data.price_per_day);
    formData.append("amentities", data.amentities);
    formData.append("room_type", data.room_type);
    formData.append("file", file);
    formData.append("hotel_name", hotelname);

    const response = await fetch(`http://localhost:5001/createRoom`, {
      method: "PUT",
      body: formData,
    });

    // Show success message using SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Room Added!',
      text: 'The room has been successfully added.',
    });
        setAddModal(false);
    roomFetch();
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async () => {
    setEditShow(false);
    try {
      const formData = new FormData();
      formData.append("room_id", roomId);
      formData.append("room_size", data.room_size);
      formData.append("bed_count", data.bed_count);
      formData.append("maximum_duration", data.maximum_duration);
      formData.append("minimum_duration", data.minimum_duration);
      formData.append("price_per_day", data.price_per_day);
      formData.append("amentities", data.amentities);
      formData.append("room_type", data.room_type);
      formData.append("file", file);

      const response = await fetch(`http://localhost:5001/roomEdit`, {
        method: "PUT",
        body: formData,
      });
      console.log(response);
      roomFetch();
    } catch (error) {
      console.log(error);
    }
  };
  const [addModal, setAddModal] = useState(false);
  const handleOpenAddModal = () => {
    setAddModal(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleCloseModal = () => {
    setShow(false);
    setEditShow(false);
    setAddModal(false);
  };
  const handleFetch = async (id) => {
    console.log("hi");
    const response = await fetch(`http://localhost:5001/particularRoom/${id}`);
    const responseData = await response.json();
    responseData.room_images =
      "http://localhost:5001/uploads/" + responseData.room_images;
    setData(responseData);
    console.log(responseData);
    setShow(true);
  };
  const handleEditFetch = async (id) => {
    console.log(id);
    setRoomId(id);
    console.log("hi");
    const response = await fetch(`http://localhost:5001/particularRoom/${id}`);
    const responseData = await response.json();
    setData(responseData);
    console.log(data);
    setEditShow(true);
  };
  
const handleDelete = async (id) => {
  // Use SweetAlert for confirmation
  const { value: confirmed } = await Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: 'Are you sure you want to delete this room?',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  // Check if user confirms deletion
  if (confirmed) {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5001/deleteRoom/${id}`);
      const responseData = await response.json();
      roomFetch();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  } else {
    // User canceled deletion
    console.log('Deletion canceled.');
  }
};

  return (
    <Card>
      <Card.Body className="border-bottom">
        <Row className="align-items-center justify-content-between">
          <Col xs="auto">
            <h2 className="mb-3">Room Status</h2>
          </Col>
          <Col xs="auto">
            <Button onClick={handleOpenAddModal}>Add Room</Button>
          </Col>
        </Row>
      </Card.Body>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Room Size</th>
              <th>Room Type</th>
              <th>Price</th>
              <th>Action</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {roomListData.map((data, index) => (
              <tr key={index}>
                <td>{data.room_id}</td>
                <td>{data.room_size}</td>
                <td>{data.room_type}</td>
                <td>{data.price_per_day}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleFetch(data.room_id);
                    }}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => {
                      handleEditFetch(data.room_id);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(data.room_id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <RoomViewModal
          data={data}
          show={show}
          handleCloseModal={handleCloseModal}
        />
      </Card.Body>
      <Modal show={editShow} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit room Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              BED COUNT
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.bed_count}
              onChange={(e) => {
                setData({ ...data, bed_count: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              MAX BOOKING PERIOD
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.maximum_duration}
              onChange={(e) => {
                setData({ ...data, maximum_duration: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">PRICE</InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.price_per_day}
              onChange={(e) => {
                setData({ ...data, price_per_day: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              MIN BOOKING PERIOD
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.minimum_duration}
              onChange={(e) => {
                setData({ ...data, minimum_duration: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              ROOM SIZE
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.room_size}
              onChange={(e) => {
                setData({ ...data, room_size: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              ROOM TYPE
            </InputGroup.Text>
            <Form.Control
              defaultValue={data.room_type}
              onChange={(e) => {
                setData({ ...data, room_type: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              AMENTITIES
            </InputGroup.Text>
            <Form.Control
              defaultValue={data.amentities}
              onChange={(e) => {
                setData({ ...data, amentities: e.target.value });
              }}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit modal */}
      <Modal show={addModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit room Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              BED COUNT
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.bed_count}
              onChange={(e) => {
                setData({ ...data, bed_count: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              MAX BOOKING PERIOD
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.maximum_duration}
              onChange={(e) => {
                setData({ ...data, maximum_duration: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">PRICE</InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.price_per_day}
              onChange={(e) => {
                setData({ ...data, price_per_day: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              MIN BOOKING PERIOD
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.minimum_duration}
              onChange={(e) => {
                setData({ ...data, minimum_duration: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              ROOM SIZE
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.room_size}
              onChange={(e) => {
                setData({ ...data, room_size: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              ROOM TYPE
            </InputGroup.Text>
            <Form.Control
              defaultValue={data.room_type}
              onChange={(e) => {
                setData({ ...data, room_type: e.target.value });
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              AMENTITIES
            </InputGroup.Text>
            <Form.Control
              defaultValue={data.amentities}
              onChange={(e) => {
                setData({ ...data, amentities: e.target.value });
              }}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddSubmit}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
