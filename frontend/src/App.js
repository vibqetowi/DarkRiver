import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./screens/HomePage";
import ProductPage from "./screens/ProductPage";
import CartPage from "./screens/CartPage";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { useContext } from "react";
import SellerPage from "./screens/SellerPage";
import LoginPage from "./screens/LoginPage";
import ShippingPage from "./screens/ShippingPage";
import SignupPage from "./screens/SignupPage";
import PaymentMethodPage from "./screens/PaymentMethodPage";
import AboutPage from "./screens/AboutPage";
import OrderPage from "./screens/Checkout";
import OrderDetailsPage from "./screens/OrderDetailsPage";
import OrderHistoryPage from "./screens/OrderHistoryPage";
import UserProfilePage from "./screens/UserProfilePage";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
        window.location.href = "/login";
  };

  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column site-container">
          <header>
            <Navbar bg="black" variant="dark" expand="md" className="topbar">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    <span className="logo">
                      <p>D</p>
                      <i className="fa-brands fa-amazon" />
                      <p>rk</p> <p className="d-hub">River</p>
                    </span>
                  </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto  w-100  justify-content-end">
                    {userInfo ? (
                      <> <LinkContainer to="/order/history">
                        <Button variant="returns-and-orders">
                          <div className="one-line-when-collapse-parent">
                            <div className="one-line-when-collapse-child">
                              Returns&nbsp; <br />
                            </div>
                            <div className="one-line-when-collapse-child">
                              <h6>
                                <b> &amp;Orders</b>
                              </h6>
                            </div>
                          </div>
                        </Button>
                      </LinkContainer>

                        <NavDropdown
                        title={userInfo.name}
                        id="basic-nav-dropdown"
                        className="user-info-dropdown"
                      >
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
                      </NavDropdown></>
                     
                    ) : (
                      <> <LinkContainer to="/login">
                        <Button variant="returns-and-orders">
                          <div className="one-line-when-collapse-parent">
                            <div className="one-line-when-collapse-child">
                              Returns&nbsp; <br />
                            </div>
                            <div className="one-line-when-collapse-child">
                              <h6>
                                <b> &amp;Orders</b>
                              </h6>
                            </div>
                          </div>
                        </Button>
                      </LinkContainer>
                           <Link className="nav-link" to="/login">
                        <Button variant="hello-sign-in">
                          <div className="one-line-when-collapse-parent">
                            <div className="one-line-when-collapse-child">
                              Hello, Sign in &nbsp; <br />
                            </div>
                            <div className="one-line-when-collapse-child">
                              <h6>
                                <b>Account &amp; Lists</b>
                              </h6>
                            </div>
                          </div>
                        </Button>
                      </Link>
                      </>
                     
                    )}

                    <Link to="/cart" className="nav-link">
                      <div className="cart-logo-container">
                        <div className="one-line-child">
                          {" "}
                          <h6>Cart &nbsp;</h6>
                        </div>
                        <div className="one-line-child">
                          {" "}
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>
                          {cart.cartItems.length > 0 && (
                            <Badge pill bg="warning">
                              {cart.cartItems.reduce(
                                (a, c) => a + c.quantity,
                                0
                              )}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>

          <main>
            <div className="center-contents">
              <div className="disclaimer">
                <div className="center-contents">
                  <span>
                    <Link to="/about" className="not-real-site-txt">
                      This is not a real website, read more in our{" "}
                      <span className="amzn-link">about page</span>
                    </Link>{" "}
                  </span>
                </div>
              </div>
            </div>

            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/dp/:slug" element={<ProductPage />} />
                <Route path="/seller/:brand" element={<SellerPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/payment" element={<PaymentMethodPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/checkout" element={<OrderPage />} />
                <Route path="/order/:id" element={<OrderDetailsPage />} />
                <Route path="/order/history" element={<OrderHistoryPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
              </Routes>
            </Container>
          </main>
          <footer>
            <br></br>
            {/* <h1 className="square-logo">DR</h1> */}

            <div className="text-center">
              <p className="copyright-txt">
                {" "}
                &#169; Not for commercial use, Amazon might sue us all
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
