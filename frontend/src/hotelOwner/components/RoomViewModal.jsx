import React from "react";

import { Card,InputGroup,Form,Container,Modal,Button } from "react-bootstrap";
export default function RoomViewModal({data,handleCloseModal,show}) {
  return (
    <div>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Room Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container className="text-center mb-4">
            <img
              src={data.room_images}
              alt="Room"
              style={{ width: "200px", height: "200px", borderRadius: "8px" }}
            />
          </Container>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">ROOM ID</InputGroup.Text>
            <Form.Control type="text" defaultValue={data.room_id} disabled />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              BED COUNT
            </InputGroup.Text>
            <Form.Control type="text" defaultValue={data.bed_count} disabled />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              MAX BOOKING PERIOD
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.maximum_duration}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              MIN BOOKING PERIOD
            </InputGroup.Text>
            <Form.Control
              type="text"
              defaultValue={data.minimum_duration}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              ROOM SIZE
            </InputGroup.Text>
            <Form.Control type="text" defaultValue={data.room_size} disabled />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="w-50 text-end">
              ROOM TYPE
            </InputGroup.Text>
            <Form.Control defaultValue={data.room_type} disabled />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
