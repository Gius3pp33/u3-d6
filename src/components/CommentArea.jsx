import React, { Component } from 'react';

import AddComment from './AddComment';
import Error from './Error';
import Loading from './Loading';
import CommentList from './CommentList';
import { Alert } from 'react-bootstrap';

class CommentArea extends Component {
    state = {
        comments: [],
        loading: false,
        error: null,
    };

    componentDidUpdate(prevProps) {
        if (this.props.asin !== prevProps.asin) {
            console.log('Nuovo asin ricevuto:', this.props.asin);
            this.fetchComments();
        }
    }

    fetchComments = async () => {
        const { asin } = this.props;

        if (!asin) {
            console.error('asin is undefined or null');
            return;
        }

        const url = `https://striveschool-api.herokuapp.com/api/comments/${asin}`;

        try {
            this.setState({ loading: true, error: null });
            const response = await fetch(url, {
                headers: {
                    'Authorization':  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgyOWMzOTJiNjYwYzAwMTUzZDhkYzkiLCJpYXQiOjE3MTk4MzU3MDUsImV4cCI6MTcyMTA0NTMwNX0.85A3dHcNjFbc4sL9LZjkz3-dgdqtBPDeaShJCQ-AVss"
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const data = await response.json();
            this.setState({ comments: data, loading: false });
        } catch (error) {
            console.error('Error fetching comments:', error.message);
            this.setState({ loading: false, error: 'Failed to fetch comments. Please try again later.' });
        }
    };

    refreshComments = () => {
        this.fetchComments();
    };

    render() {
        const { comments, loading, error } = this.state;
        const { asin } = this.props;

        if (!asin) {
            return <Alert>No elementId (asin) provided.</Alert>;
        }

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <Error message={error} />;
        }

        if (comments.length === 0) {
            return (
                <div className="comment-area">
                    <h3>Comments</h3>
                    <Alert>Nessun commento disponibile.</Alert>
                    <AddComment asin={asin} refreshComments={this.refreshComments} />
                </div>
            );
        }

        return (
            <div className="comment-area">
                <h3>Comments</h3>
                <CommentList comments={comments} />
                <AddComment asin={asin} refreshComments={this.refreshComments} />
            </div>
        );
    }
}
export default CommentArea