import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
        aisles: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [{ loading0, error0, products }, dispatch0] = useReducer(
    logger(reducer),
    {
      products: [],
      loading: true,
      error: "",
    }
  );

  useEffect(() => {
    const fetchProd = async () => {
      dispatch0({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch0({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch0({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchProd();
  }, []);

  return (
    <>
      <Helmet>
        <title>DarkRiver</title>
      </Helmet>
      <Container fluid="xxl">
        <h1>Featured Products</h1>
        <div className="fproducts">
          {loading0 ? (
            <LoadingBox />
          ) : error0 ? (
            <MessageBox variant="danger">could not load product</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
        </div>
        <br></br>
        <br></br>
        <h1>Categories</h1>
        <h2>Under Construction</h2>
      </Container>
    </>
  );
}
