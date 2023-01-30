import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';

export default function LayoutBooks({ InfoBar }) {
  return (
    <div style={{ margin: '4rem 0' }}>
      <Container>
        <Row>
          <Col xs={3}>{InfoBar}</Col>
          <Col xs={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
