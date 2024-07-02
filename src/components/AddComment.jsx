import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddComment = ({ asin, refreshComments }) => {
      // Stato del form per tenere traccia del commento e del rate
    const [formState, setFormState] = useState({
        comment: '',
        rate: 1,
    });
      // gestisce gli eventi per aggiornare lo stato del form quando l'utente inserisce dati
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
       // Gestisce gli eventi per l'invio del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { comment, rate } = formState;
        const url = 'https://striveschool-api.herokuapp.com/api/comments/';
        const newComment = {
            comment,
            rate,
            elementId: asin,
        };
        console.log('Nuovo commento:', newComment); 

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgyOWMzOTJiNjYwYzAwMTUzZDhkYzkiLCJpYXQiOjE3MTk4MzU3MDUsImV4cCI6MTcyMTA0NTMwNX0.85A3dHcNjFbc4sL9LZjkz3-dgdqtBPDeaShJCQ-AVss"
                },
                body: JSON.stringify(newComment),
            });

            if (!response.ok) {
                throw new Error('Commento non riuscito');
            }

            refreshComments(); // refresh dei commenti dopo l'aggiunta di un commento
            setFormState({
                comment: '',
                rate: 1,
            }); 
        } catch (error) {
            console.log('Errore nell\'aggiungere il commento:', error.message);
        }
    };

    const { comment, rate } = formState; // destrutturazione dello stato del form

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="rate">
                <Form.Label>Rate</Form.Label>
                <Form.Control
                    as="select"
                    name="rate"
                    value={rate}
                    onChange={handleInputChange}
                    required
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" className='mt-2' size='sm' type="submit">
                Add Comment
            </Button>
        </Form>
    );
};

export default AddComment;
