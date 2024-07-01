import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class AddComment extends Component {
    state = {
        comment: '',
        rate: 1,
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { comment, rate } = this.state;
        const { asin, refreshComments } = this.props;
        const url = 'https://striveschool-api.herokuapp.com/api/comments/';
        const newComment = {
            comment,
            rate,
            elementId: asin,
        };
        console.log('New comment:', newComment); // Verifica il contenuto di newComment prima di inviarlo
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
                throw new Error('Failed to add comment');
            }

            refreshComments();
            this.setState({
                comment: '',
                rate: 1,
            });
        } catch (error) {
            console.log('Error adding comment:', error.message);
        }
    };

    render() {
        const { comment, rate } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={this.handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="rate">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                        as="select"
                        name="rate"
                        value={rate}
                        onChange={this.handleInputChange}
                        required
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" className='mt-2'size='sm' type="submit">
                    Add Comment
                </Button>
            </Form>
        );
    }
}

export default AddComment;
