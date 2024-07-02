import React, { Component } from 'react';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import { Container, Row, Col, Form } from 'react-bootstrap';

class BookList extends Component {
    state = {
        selectedAsin: null, // Stato che tiene traccia del libro selezionato
        searchQuery: '', // Stato che tiene traccia del valore di ricerca
    };

    handleBookSelect = (asin) => {
        // Cambia il libro selezionato salvando l'asin
        this.setState((prevState) => ({
            selectedAsin: prevState.selectedAsin === asin ? null : asin,
        }));
    };

    handleSearchChange = (event) => {
        // Aggiorna lo stato del searchQuery
        this.setState({ searchQuery: event.target.value });
    };

    render() {
        const { books } = this.props;
        const { selectedAsin, searchQuery } = this.state;

        // Filtra i libri in base alla query di ricerca
        const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <Container>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={this.handleSearchChange}
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
                                        onSelect={this.handleBookSelect}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col md={4} style={{ position: 'sticky', top: '0', height: '100vh', overflowY: 'auto' }}>
                        {selectedAsin && <CommentArea asin={selectedAsin} />} {/* Passaggio di selectedAsin cioè della prop */}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BookList;
