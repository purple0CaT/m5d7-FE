import React from "react";
import { Navbar, Button, FormControl, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">
        Amazon
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/" className='text-dark' style={{ marginRight: "2em", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/products" className='text-dark' style={{ marginRight: "2em" }}>
          Products
        </Link>
        <Link to="/newproduct" className='text-dark' style={{ marginRight: "2em" }}>
          Add a product
        </Link>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>
  );
};

export default NavBar;
