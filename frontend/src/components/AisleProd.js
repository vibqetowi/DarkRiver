import { Button, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Rating from "./Rating";
import { Store } from "../Store";
import { useContext } from "react";
import axios from "axios";

export default function AisleProd(props) {
  const { state, dispatch: tba } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return;
    }
    tba({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    Navigate("/cart");
  };
  const { product,aisle } = props;
  return (
    <Card bg={"dark"} className="prod-card">
      <Link to={`/dp/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link className="prodName" to={`/dp/${product.slug}`}>
          <Card.Title style={{ fontSize: "1em" }}>{product.name}</Card.Title>
          <Rating rating={product.rating} numRatings={product.numRatings} />
          <Card.Text style={{ color: "white" }}>${product.price}</Card.Text>
        </Link>
        <br></br>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            variant="yellow-black-txt"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

