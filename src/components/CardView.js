import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '/home/sahilvadia/projects/crypticwrites/src/Images/test.jpg';
import '/home/sahilvadia/projects/crypticwrites/src/style/CardView.css';

function CardView() {
  return (
    <div class="CardDiv">

    <div class="CardChild">
    <Card>

    <span class="CardImg">
    <Card.Img variant="top" src={logo} />
    </span>

      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>

    <div class="CardChild">
    <Card style={{ width: '50rem' }}>
    <span class="CardImg">
    <Card.Img variant="top" src={logo} />
    </span>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    </div>
    </div>
  );
}

export default CardView;