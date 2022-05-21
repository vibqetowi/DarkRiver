import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AislePage from "./screens/AislePage";
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

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column site-container">
          <header>
            <Navbar variant="dark" className="topbar">
              <Container fluid>
                <LinkContainer to="/">
                  <Navbar.Brand>
                    <span className="logo">
                      <p>D</p>
                      <i className="fa-brands fa-amazon" />
                      <p>rk</p> <p className="d-hub">River</p>
                    </span>
                  </Navbar.Brand>
                </LinkContainer>
                <LinkContainer to="/myorders">
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
          </header>
          <main>
            <div className="center-contents">
              {" "}
              <div className="disclaimer">
                <div className="center-contents">
                  {" "}
                  <span>
                    {" "}
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
                <Route path="/aisle/:slug" element={<AislePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/payment" element={<PaymentMethodPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/checkout" element={<OrderPage />} />
                <Route path="/order/:id" element={<OrderDetailsPage />} />
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
