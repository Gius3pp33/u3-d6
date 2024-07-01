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

    componentDidMount() {
        const { asin } = this.props;
        if (asin) {
            this.fetchComments();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.asin !== prevProps.asin) {
            console.log('Nuovo asin ricevuto:', this.props.asin);
            if (this.props.asin) {
                this.fetchComments();
            } else {
                this.setState({ comments: [], loading: false });
            }
        }
    }

    fetchComments = async () => {
        const { asin } = this.props;
        const url = `https://striveschool-api.herokuapp.com/api/comments/${asin}`;

        try {
            this.setState({ loading: true, error: null });
            const response = await fetch(url, {
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgyOWMzOTJiNjYwYzAwMTUzZDhkYzkiLCJpYXQiOjE3MTk4MzU3MDUsImV4cCI6MTcyMTA0NTMwNX0.85A3dHcNjFbc4sL9LZjkz3-dgdqtBPDeaShJCQ-AVss"
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

    handleDeleteComment = async (commentId) => {
        const { asin } = this.props;
        const url = `https://striveschool-api.herokuapp.com/api/comments/${commentId}?asin=${asin}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgyOWMzOTJiNjYwYzAwMTUzZDhkYzkiLCJpYXQiOjE3MTk4MzU3MDUsImV4cCI6MTcyMTA0NTMwNX0.85A3dHcNjFbc4sL9LZjkz3-dgdqtBPDeaShJCQ-AVss'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }

            this.setState((prevState) => ({
                comments: prevState.comments.filter(comment => comment._id !== commentId),
            }));
        } catch (error) {
            console.error('Error deleting comment:', error.message);
            this.setState({ error: 'Failed to delete comment. Please try again later.' });
        }
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

        return (
            <div className="comment-area">
                <h3>Comments</h3>
                {comments.length === 0 && <Alert>Nessun commento disponibile.</Alert>}
                <CommentList comments={comments} onDelete={this.handleDeleteComment} />
                <AddComment asin={asin} refreshComments={this.refreshComments} />
            </div>
        );
    }
}

export default CommentArea;
