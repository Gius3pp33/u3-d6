import React, { useState } from 'react';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import { Container, Row, Col, Form } from 'react-bootstrap';

const BookList = ({ books }) => {
    const [selectedAsin, setSelectedAsin] = useState(null); // Stato per memorizzare il libro selezionato
    const [searchQuery, setSearchQuery] = useState(''); // Stato per memorizzare la query di ricerca
    
    // funzione per gestire la selezione di un libro
    const handleBookSelect = (asin) => {
        console.log(`Selezionato il libro con asin: ${asin}`);
        setSelectedAsin((prevSelectedAsin) => (prevSelectedAsin === asin ? null : asin));
    };

    // filtra i libri in base alla query di ricerca
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('libri filtrati:', filteredBooks); // Log dei libri filtrati

    return (
        <Container >
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            <Row>
                <Col md={8}>
                    <Row>
                        {filteredBooks.map((book) => (
                            <Col md={6} key={book.asin}>
                                <SingleBook
                                    book={book}
                                    isSelected={selectedAsin === book.asin}
                                    onSelect={handleBookSelect}
                                    data-testid="book-card"
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col md={4} style={{ position: 'sticky', top: '0', height: '100vh', overflowY: 'auto' }}>
                    {selectedAsin && <CommentArea asin={selectedAsin} />}
                </Col>
            </Row>
        </Container>
    );
};

export default BookList;
