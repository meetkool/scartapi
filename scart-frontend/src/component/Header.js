import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { FaShoppingCart } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Logout from './Logout'; // import the Logout component

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="pt-2 pb-2 ps-2 pe-2 fs-1" href="#">
          sCart
        </Navbar.Brand>
        <Navbar.Toggle className="pe-3" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link className="pe-1 ps-1" href="#action1">
              Home
            </Nav.Link>
            <Nav.Link href="#action2">Products</Nav.Link>
          </Nav>
          <Form className="d-flex container-fluid ps-1 pe-1">
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Nav className="my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="#action1">
              <FaShoppingCart />
            </Nav.Link>
            <Logout /> {/* add the Logout button here */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
