import React,{Component} from "react";
import { Card,Container,Row,Col, Badge,Dropdown,DropdownButton } from "react-bootstrap";
import fantasyBooks from '../data/fantasy.json';
import historyBooks from '../data/history.json';
import horrorBooks from '../data/horror.json';
import romanceBooks from '../data/romance.json';
import scifiBooks from '../data/scifi.json';

// Oggetto che mappa i generi ai rispettivi dati dei libri
const genres = {
    Fantasy: fantasyBooks,
    History: historyBooks,
    Horror: horrorBooks,
    Romance: romanceBooks,
    Scifi: scifiBooks,
};

class AllTheBooks extends Component {
    state = {
     selectedGenre: 'Fantasy'
    }
     // metodo per gestire il cambio del genere selezionato
    handleSelect = (genre) => {
        this.setState({ selectedGenre: genre });
    };

    render() {
        const { selectedGenre } = this.state; // estrae il genere selezionato dallo stato
        const books = genres[selectedGenre]; // ottiene i libri del genere selezionato

        return (
            <Container className="mt-5">
                <DropdownButton  title="Select Genre" className="mb-4" variant="dark">
                      {/* Mappa ogni genere come un elemento di dropdown */}
                    {Object.keys(genres).map((genre) => (
                        <Dropdown.Item key={genre} onClick={() => this.handleSelect(genre)}
                        className="text-white bg-dark">
                            {genre}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                <Row>
                    {books.map((book) => (
                        <Col md={4} key={book.asin} className="mb-4">
                            <Card className="book-card">
                                <Card.Img variant="top" src={book.img} className="img-fluid" style={{ height: '600px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text className="lead">Genre: {book.category} </Card.Text>
                                    <Badge bg="dark">{book.price}€</Badge>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default AllTheBooks;