import React from "react";
import { Navbar, Button, FormControl, Nav, Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand as={Link} to="/">
        <small className="font-weight-bold font-italic not-amazon">not</small>
        Amazon
      </Navbar.Brand>
      <Nav className="mr-auto ml-4 pl-2">
        <NavLink
          activeClassName="selected"
          exact
          to="/"
          className="text-dark navlink"
          style={{ marginRight: "2em", textDecoration: "none" }}
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="selected"
          exact
          to="/newproduct"
          className="text-dark navlink"
          style={{ marginRight: "2em" }}
        >
          Add a product
        </NavLink>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>
  );
};

export default NavBar;
