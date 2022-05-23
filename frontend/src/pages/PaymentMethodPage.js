import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";
import { Container } from "react-bootstrap";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/checkout");
  };
  return (
    <div>
      <Container className="max-width-800px">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="shipping-menu">
          <Helmet>
            <title>Payment Method</title>
          </Helmet>
          <h1 className="my-3">Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Gift Card"
                label="Gift Card"
                value="Gift Card"
                checked={paymentMethodName === "Gift Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <p>gift card not yet implemented</p>
            </div>
            <div className="mb-3">
              <Button variant="yellow-black-txt-wide" type="submit">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}
