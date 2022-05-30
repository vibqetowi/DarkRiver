import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { useContext } from "react";
import SellerPage from "./pages/SellerPage";
import LoginPage from "./pages/LoginPage";
import ShippingPage from "./pages/ShippingPage";
import SignupPage from "./pages/SignupPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import AboutPage from "./pages/AboutPage";
import OrderPage from "./pages/CheckoutPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import UserProfilePage from "./pages/UserProfilePage";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "./utils";
import { useState } from "react";
import SearchBox from "./components/SearchBox";
import SearchResultsPage from "./pages/SearchResultsPage";
import UnderConstruction from "./pages/UnderConstruction";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrderList from "./pages/AdminOrderList";
import AdminUserList from "./pages/AdminUserList";
import AdminProductList from "./pages/AdminProductList";
import AdminProductEdit from "./pages/AdminProductEdit";
import AdminUserEdit from "./pages/AdminProductList";

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

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div
          className="d-flex flex-column site-container"
          onClick={sidebarIsOpen ? () => setSidebarIsOpen(false) : null}
          id={sidebarIsOpen ? "greyed-out" : null}
        >
          <header>
            <Navbar bg="black" variant="dark" expand="md" className="topbar">
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <SearchBox />
                  <Nav className="me-auto justify-content-end">
                    {userInfo ? (
                      <>
                        {" "}
                        <LinkContainer to="/order/history">
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
                        </NavDropdown>
                      </>
                    ) : (
                      <>
                        {" "}
                        <LinkContainer to="/login">
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
                                <div className="one-line-parent">
                                  <div className="one-line-child">
                                    {" "}
                                    Hello, Sign in &nbsp;{" "}
                                  </div>
                                </div>
                              </div>
                              <div className="one-line-when-collapse-child">
                                <div className="one-line-parent">
                                  <div className="one-line-child">
                                    {" "}
                                    <h6>
                                      <b>Account &amp; Lists</b>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Button>
                        </Link>
                      </>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title="Admin" id="admin-nav-dropdown">
                        <LinkContainer to="/admin/dashboard">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/products">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/orders">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/admin/users">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
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
              <Button
                variant="sidebar-toggle"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i> All
              </Button>
              <Link to="/underConstruction" className="navbar-prime-link">
                Prime
              </Link>
              <Link
                to="/underConstruction"
                className="navbar-best-sellers-link"
              >
                Best Sellers
              </Link>
              <a
                href="mailto:admin.darkriver@encryptedmail.anonaddy.com"
                id="navbar-contact"
              >
                Contact us
              </a>
            </Navbar>{" "}
          </header>
          <div
            id="hideMe"
            className={
              sidebarIsOpen
                ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
                : "side-navbar d-flex justify-content-between flex-wrap flex-column"
            }
          >
            <Nav className="flex-column text-white w-100 p-2">
              <Nav.Item>
                <br></br>
                <strong>Categories</strong>
              </Nav.Item>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={`/search?category=${category}`}
                    onClick={() => setSidebarIsOpen(false)}
                    className="normal-ass-white-txt"
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          <main>
            <div className="center-contents">
              <div className="disclaimer">
                <div className="center-contents">
                  <span>
                    <Link to="/about" className="not-real-site-txt">
                      This is a portfolio project, click to read more
                    </Link>{" "}
                  </span>
                </div>
              </div>
            </div>

            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/dr/:slug" element={<ProductPage />} />
                <Route path="/seller/:brand" element={<SellerPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/payment" element={<PaymentMethodPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/checkout" element={<OrderPage />} />
                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetailsPage />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/order/history"
                  element={
                    <ProtectedRoute>
                      <OrderHistoryPage />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route path="/search" element={<SearchResultsPage />} />
                <Route
                  path="/underConstruction"
                  element={<UnderConstruction />}
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <AdminOrderList />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <AdminUserList />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProductList />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/product/:id"
                  element={
                    <AdminRoute>
                      <AdminProductEdit />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/admin/user/:id"
                  element={
                    <AdminRoute>
                      <AdminUserEdit />
                    </AdminRoute>
                  }
                ></Route>
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
