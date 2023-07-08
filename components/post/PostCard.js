/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deletePost } from '../../utils/data/postData';

const PostCard = ({
  id,
  title,
  imageUrl,
  publicationDate,
  content,
  OnUpdate,
  editable, // New prop for determining if the post is editable
}) => {
  const router = useRouter();

  const deleteThisPost = () => {
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => OnUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Title>{title}</Card.Title>
      <Card.Body>
        <Card.Text>Date: {publicationDate}</Card.Text>
        <Card.Text>{content}</Card.Text>
        <Card.Body>
          <img src={imageUrl} alt="postimage" style={{ width: '200px' }} />
        </Card.Body>
      </Card.Body>
      {editable && ( // Only render the buttons if editable is true
        <>
          <Button
            onClick={() => {
              router.push(`/post/edit/${id}`);
            }}
          >
            Edit Post
          </Button>
          <Button onClick={deleteThisPost}>Delete Post</Button>
        </>
      )}
    </Card>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  OnUpdate: PropTypes.func.isRequired,
  editable: PropTypes.bool, // PropTypes for the editable prop
};

PostCard.defaultProps = {
  editable: false, // Default value of editable prop is false
};

export default PostCard;
