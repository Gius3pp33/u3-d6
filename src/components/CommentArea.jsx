import React, { useState, useEffect } from 'react';
import AddComment from './AddComment';
import Error from './Error';
import Loading from './Loading';
import CommentList from './CommentList';
import { Alert } from 'react-bootstrap';

const CommentArea = ({ asin }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Effettua la fetch dei commenti ogni volta che asin cambia
    useEffect(() => {
        if (asin) {
            fetchComments();
        }
    }, [asin]);

    const fetchComments = async () => {
        const url = `https://striveschool-api.herokuapp.com/api/comments/${asin}`;
        setLoading(true);
        setError(null);

        console.log('Inizio fetch dei commenti'); 

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgyOWMzOTJiNjYwYzAwMTUzZDhkYzkiLCJpYXQiOjE3MTk4MzU3MDUsImV4cCI6MTcyMTA0NTMwNX0.85A3dHcNjFbc4sL9LZjkz3-dgdqtBPDeaShJCQ-AVss"
                },
            });

            if (!response.ok) {
                throw new Error('Errore');
            }

            const data = await response.json();
            console.log('Commenti ricevuti:', data); 
            setComments(data);
        } catch (error) {
            console.log('Errore durante la fetch dei commenti:', error.message); 
            setError('Errore durante la fetch dei commenti,riprova più tardi.');
        } finally {
            console.log('Fetch dei commenti completata'); 
            setLoading(false);
        }
    };

    // Funzione di resfresh per i commenti
    const refreshComments = () => {
        console.log('refresh of the comments'); // Log in italiano
        fetchComments();
    };

    // Funzione per eliminare un commento
    const handleDeleteComment = async (commentId) => {
        const url = `https://striveschool-api.herokuapp.com/api/comments/${commentId}`;

        console.log(`Cancellazione del commento con id: ${commentId}`);

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjgyOWMzOTJiNjYwYzAwMTUzZDhkYzkiLCJpYXQiOjE3MTk4MzU3MDUsImV4cCI6MTcyMTA0NTMwNX0.85A3dHcNjFbc4sL9LZjkz3-dgdqtBPDeaShJCQ-AVss'
                },
            });

            if (!response.ok) {
                throw new Error('Cancellazione dei commenti non riuscita');
            }

            console.log(`Commento con id: ${commentId} eliminato`);
            setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.log('Errore durante l\'eliminazione del commento:', error.message); 
            setError('Errore durante l\'eliminazione del commento,riprova più tardi.');
        }
    };

    // Ritorna un alert se asin non è fornito
    if (!asin) {
        return <Alert>No elementId (asin) provided.</Alert>;
    }

    // Mostra il componente di loading durante il fetch
    if (loading) {
        return <Loading />;
    }

    // Mostra un componente di errore se c'è un problema
    if (error) {
        return <Error message={error} />;
    }

    // Ritorna la lista dei commenti e il form per aggiungere nuovi commenti
    return (
        <div className="comment-area" >
            <h3>Comments</h3>
            {comments.length === 0 && <Alert>Nessun commento disponibile.</Alert>}
            <CommentList comments={comments} onDelete={handleDeleteComment} />
            <AddComment asin={asin} refreshComments={refreshComments} />
        </div>
    );
};

export default CommentArea;
