import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: tba } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    tba({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="prod-page-div">
      {" "}
      <Container fluid className="rounded-border-black-bg">
        <Helmet>
          <title>{product.slug}</title>
        </Helmet>

        <Row>
          <Col xl={4} className="rounded-border-black-bg">
            <img
              className="img-large"
              src={product.image}
              alt={product.name}
            ></img>
          </Col>

          <Col xl={5} className="rounded-border-black-bg">
            <ListGroup variant="flush">
              <ListGroup.Item className="black-bg">
                <Link
                  className="normal-ass-white-txt"
                  to={`/seller/${product.brand}`}
                >
                  Brand: {product.brand}
                </Link>
                <h1 className="prod-txt">{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item className="black-bg">
                <span>
                  <p className="one-line">
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </p>
                </span>
              </ListGroup.Item>
              <ListGroup.Item className="black-bg">
                <p className="one-line">Price : ${product.price}</p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="amzn-link"
                  href="https://www.amazon.com/gp/help/customer/display.html?nodeId=202075130"
                >
                  &nbsp; &#38;Free Returns on some sizes and colours
                </a>
              </ListGroup.Item>
              <ListGroup.Item className="black-bg">
                <p id="p-wrap">
                  {" "}
                  Description:<br></br>
                  {product.description}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col xl={3} className="rounded-border-black-bg">
            <Card className="black-bg">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="black-bg">
                    <Row>
                      <Col>
                        <p>Price: </p>
                      </Col>
                      <Col>
                        <p>${product.price} </p>{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="black-bg">
                    <Row>
                      <Col>
                        <p>Status:</p>
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="black-bg">
                      <div className="d-grid">
                        <Button
                          variant="yellow-black-txt"
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </Button>
                        <Button variant="yellow-black-txt">
                          <Link to="/cart" className="normal-ass-black-txt">
                            {" "}
                            View Cart
                          </Link>
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
