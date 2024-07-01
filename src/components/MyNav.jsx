// src/components/MyNav.jsx
import React from "react";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";

const MyNav = ({ onSelectGenre, genres }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand href="#">📓📓EpiBooks</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Browse</Nav.Link>
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Select Genre
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {Object.keys(genres).map((genre) => (
                <Dropdown.Item key={genre} onClick={() => onSelectGenre(genre)}>
                  {genre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
