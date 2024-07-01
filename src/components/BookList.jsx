import React, { Component } from 'react';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import { Container, Row, Col } from 'react-bootstrap';

class BookList extends Component {
    state = {
        selectedAsin: null, // Stato che tiene traccia del libro selezionato
    };

    handleBookSelect = (asin) => {
         // Cambia il libro selezionato salvando l'asin
        this.setState((prevState) => ({
            selectedAsin: prevState.selectedAsin === asin ? null : asin
        }));
    };

    render() {
        const { books } = this.props;
        const { selectedAsin } = this.state;

        return (
            <Container>
                <Row>
                    <Col md={8}>
                        <Row>
                            {books.map((book) => (
                                <Col md={4} key={book.asin}>
                                    <SingleBook
                                        book={book}
                                        isSelected={selectedAsin === book.asin}
                                        onSelect={this.handleBookSelect}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col md={4}>
                        {selectedAsin && <CommentArea asin={selectedAsin} />}  {/* Passaggio di selectedAsin cioè della prop */}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BookList;
