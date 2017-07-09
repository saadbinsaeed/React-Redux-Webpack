import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Component = () => (
  <Container>
    <Row>
      <Col md={{ size: 'auto', offset: 1 }}>
        <div>
          <h1>We can not seem to find the page you're looking for.</h1><br/><br/>
          <img src="error-img.png" />
        </div>
      </Col>
    </Row>
  </Container>
);

export default Component;
