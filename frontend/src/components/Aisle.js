import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Aisle(props) {
  const { aisle } = props;
  return (
    <Card className="aisle-card" bg={"dark"} border="dark">
      <Link to={`/aisle/${aisle.slug}`}>
        <img src={aisle.image} className="card-img-top" alt={aisle.name} />
      </Link>
      <Card.Body>
        <Link className="aisleName" to={`/aisle/${aisle.slug}`}>
          <Card.Title style={{ fontSize: "1.5em" }}>{aisle.slug}</Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
}
export default Aisle;
