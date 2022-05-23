import { Button } from "bootstrap";
import { useContext } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import React from "react";

export default function SiteTopbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
  };
  return (
    <Navbar variant="dark" className="topbar">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <span className="logo">
              <p>D</p>
              <i className="fa-brands fa-amazon" />
              <p>rkRiver</p>
            </span>
          </Navbar.Brand>
        </LinkContainer>

        <LinkContainer to="/orderhistory">
          <Button variant="returns-and-orders">
            Returns <br></br>
            <h6>
              <b> &amp;Orders</b>
            </h6>
          </Button>
        </LinkContainer>

        {userInfo ? (
          <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
            <LinkContainer to="/profile">
              <NavDropdown.Item>User Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <Link
              className="dropdown-item"
              to="#signout"
              onClick={signoutHandler}
            >
              Sign Out
            </Link>
          </NavDropdown>
        ) : (
          <Link className="nav-link" to="/login">
            <Button variant="returns-and-orders">
              Hello, Sign in <br></br>
              <h6>
                <b>Account &amp; Lists</b>
              </h6>
            </Button>
          </Link>
        )}
        <Nav className="me-auto">
          <Link to="/cart" className="nav-link">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            {cart.cartItems.length > 0 && (
              <Badge pill bg="warning">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
