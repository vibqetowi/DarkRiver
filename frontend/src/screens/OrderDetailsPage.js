import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../util";
import { Container } from "react-bootstrap";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
export default function OrderDetailsPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="center-contents">
      {" "}
      <div className="max-width-1000px">
        <Container fluid className="rounded-border-black-bg">
          {" "}
          <Helmet>
            <title>Order {orderId}</title>
          </Helmet>
          <h2 className="my-3">Order #{orderId}</h2>
          <Row>
            <Col md={8}>
              <Card className="black-bg">
                <Card.Body>
                  <Card.Title>Shipping</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </Card.Text>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Delivered</MessageBox>
                  )}
                </Card.Body>
              </Card>
              <Card className="black-bg">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method:</strong> {order.paymentMethod}
                  </Card.Text>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </Card.Body>
              </Card>

              <Card className="black-bg">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                      <ListGroup.Item key={item._id} className="black-bg">
                        <Row className="align-items-center">
                          <div className="one-line-parent">
                            {" "}
                            <div className="one-line-child">
                              <Col md={6}>
                                <Link to={`/product/${item.slug}`}>
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="smoll-img"
                                  ></img>
                                </Link>
                              </Col>
                            </div>
                            <Col
                              md={3}
                              className="one-line-child-vertical-center"
                            >
                              <Link
                                to={`/product/${item.slug}`}
                                className="amzn-link"
                              >
                                {" "}
                                {item.name}
                              </Link>
                              <p>
                                ${item.price} x {item.quantity}
                              </p>
                            </Col>
                          </div>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="black-bg">
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="black-bg">
                      <Row>
                        <Col className="normal-ass-white-txt">Items</Col>
                        <Col className="normal-ass-white-txt">
                          ${order.itemsPrice.toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="black-bg">
                      <Row>
                        <Col className="normal-ass-white-txt">Shipping</Col>
                        <Col className="normal-ass-white-txt">
                          ${order.shippingPrice.toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="black-bg">
                      <Row>
                        <Col className="normal-ass-white-txt">Tax</Col>
                        <Col className="normal-ass-white-txt">
                          ${order.taxPrice.toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="black-bg">
                      <Row>
                        <Col>
                          <strong className="normal-ass-white-txt">
                            {" "}
                            Order Total
                          </strong>
                        </Col>
                        <Col>
                          <strong className="normal-ass-white-txt">
                            ${order.totalPrice.toFixed(2)}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
