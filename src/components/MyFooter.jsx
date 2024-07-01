import React from "react";
import { Container,Row,Col } from "react-bootstrap";

const MyFooter = () => {
    return(
        <footer className="bg-dark text-white mt-5 p-4 text-center">
        <Container>
          <Row>
            <Col>
              <p> C 2024 EpiBooks <br/> All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
};

export default MyFooter;