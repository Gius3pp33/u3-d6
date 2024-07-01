import React from 'react';
import SingleComment from './SingleComment';
// CommentList riceve un array di commenti e una funzione onDelete come props
const CommentList = ({ comments, onDelete }) => {
    return (
        <ul className='list-unstyled'>
            {comments.map((comment) => (
                <SingleComment key={comment._id} comment={comment} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default CommentList;
