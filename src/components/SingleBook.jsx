import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const SingleBook = ({ book, isSelected, onSelect }) => {
    const handleClick = () => {
        onSelect(book.asin);
    };

    return (
        <Card
            className={`book-card mb-4 ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
            style={{
                transition: 'all 0.3s ease',
                border: isSelected ? '2px solid red' : '1px solid black', // Applica bordo rosso quando isSelected è true
            }}
        >
            <Card.Img
                variant="top"
                src={book.img}
                className="img-fluid"
                style={{ height: '600px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text className="lead">Genre: {book.category}</Card.Text>
                <Badge bg="dark">{book.price}€</Badge>
            </Card.Body>
        </Card>
    );
};

export default SingleBook;
