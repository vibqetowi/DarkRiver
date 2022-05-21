import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import logger from "use-reducer-logger";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { Store } from "../Store";
import { getError } from "../utils";

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <Container className="rounded-border-black-bg">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <Row style={{ minHeight: "400px" }}>
        <Col xl={8} className="black-bg">
          {cartItems.length === 0 ? (
            <div className="col2">
              <div className="cart-page-left-left-div">
                <img src="/images/shopNow.jpg" className="shop-now-img"></img>
              </div>
              <div className="cart-page-left-right-div">
                <h3>Your DarkRiver Cart is empty </h3> <br></br>
                <Link to="/" className="amzn-link ">
                  Shop today's deal
                </Link>
              </div>
            </div>
          ) : (
            <>
              <ListGroup className="black-bg">
                <Row>
                  <Col xl={6}></Col>
                  <Col xl={6}>
                    {" "}
                    <h1 className="cart-page-h1-txt">Shopping Cart</h1>
                  </Col>
                </Row>

                {cartItems.map((item) => (
                  <ListGroup.Item className="black-bg" key={item._id}>
                    <Row className="align-items-center">
                      <Col xl={4} className="black-bg">
                        <Link
                         
                          to={`/dp/${item.slug}`}
                        >
                          {" "}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          ></img>
                        </Link>
                      </Col>
                      <Col xl={5}>
                        <Link to={`/product/${item.slug}`} className="normal-ass-white-txt"></Link>
                        <div className="one-line-parent">
                          <p className="cart-page-txt"> {item.name}</p>
                          <p>
                            <Link
                              className="normal-ass-white-txt"
                              to={`/seller/${item.brand}`}
                            >
                              sold by <p className="amzn-link">{item.brand}</p>
                            </Link>
                          </p>
                          <p className="cart-page-txt"> ${item.price}</p>
                          <div className="one-line-child">
                            <Button
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 1)
                              }
                              variant="dark"
                              disabled={item.quantity === 1}
                            >
                              <i className="fas fa-minus-circle"></i>
                            </Button>
                            <span className="normal-ass-white-txt">
                              {item.quantity}
                            </span>{" "}
                            <Button
                              variant="dark"
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                              disabled={item.quantity === item.countInStock}
                            >
                              <i className="fas fa-plus-circle"></i>
                            </Button>
                          </div>
                          <div className="one-line-child">
                            <Button
                              onClick={() => removeItemHandler(item)}
                              variant="black-bg-white-txt"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Col>
        <Col xl={4}>
          <Card className="black-bg">
            <Card.Body>
              {cartItems.length === 0 ? (
                <div></div>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item className="black-bg">
                    <br></br>
                    <br></br>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : ${subtotal}
                    </h3>
                  </ListGroup.Item>
                  <ListGroupItem className="black-bg">
                    {subtotal < 35 ? (
                      <p>
                        add ${35 - subtotal}
                        &nbsp;of items to get free shipping
                      </p>
                    ) : (
                      <p> &amp; free shipping</p>
                    )}
                  </ListGroupItem>
                  <ListGroup.Item className="black-bg">
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="yellow-black-txt"
                        onClick={checkoutHandler}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
