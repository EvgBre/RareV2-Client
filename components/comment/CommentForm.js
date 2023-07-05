import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateComment } from '../../utils/data/commentData';

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
        authorId: obj.author_id,
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

      updateComment(commentUpdate).then(() => router.push(`/comments/${comment.post_id}`));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Comment</h2>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control name="content" required value={comment.content} onChange={handleChange} />
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
    author_id: PropTypes.number,
    post_id: PropTypes.number,
    content: PropTypes.string,
    created_on: PropTypes.string,
  }),
  postId: PropTypes.number,
};

CommentForm.defaultProps = {
  obj: {},
  postId: 0,
};

export default CommentForm;
