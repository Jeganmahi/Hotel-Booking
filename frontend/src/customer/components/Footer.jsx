import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return (
    <Container fluid  className="d-flex  justify-content-center"style={{ background: 'rgb(229, 231, 235)', height: "150px" }}>
        <Row className='d-flex  justify-content-center align-items-center'>
            <h5>
            &copy;
                Designed and developed by V C Jegan Student at M KUMARASAMY COLLEGE OF ENGINEERING
            </h5>
        </Row>
    </Container>
  );
}
