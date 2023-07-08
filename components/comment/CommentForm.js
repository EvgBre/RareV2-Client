import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../utils/data/commentData';

const CommentForm = ({ obj, postId }) => {
  const { user } = useAuth();

  const [comment, setComment] = useState({
    authorId: user.id,
    postId: Number(postId),
  });

  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setComment({
        id: obj.id,
        authorId: obj.authorId,
        postId: obj.post_id,
        content: obj.content,
        createdOn: obj.created_on,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.id) {
      const commentUpdate = {
        id: comment.id,
        authorId: comment.author_id,
        postId: comment.post_id,
        content: comment.content,
        createdOn: comment.created_on,
      };

      updateComment(commentUpdate).then(() => router.push(`/comments/${comment.postId.id}`));
    } else {
      // Call the createComment function and handle the response
      createComment(comment)
        .then((comments) => router.push(`/comments/${comments.post_id.id}`));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Comment</h2>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a comment"
            name="content"
            value={comment.content || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    authorId: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
    post_id: PropTypes.number,
    content: PropTypes.string,
    created_on: PropTypes.string,
  }),
  postId: PropTypes.number,
};

CommentForm.defaultProps = {
  obj: {},
  postId: '',
};

export default CommentForm;
