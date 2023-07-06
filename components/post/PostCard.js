/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deletePost } from '../../utils/data/postData';

const PostCard = ({
  id,
  // rareUserId,
  title,
  imageUrl,
  publicationDate,
  content,
  OnUpdate,
}) => {
  const deleteThisPost = () => {
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => OnUpdate());
    }
  };
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Title>{title}</Card.Title>
      <Card.Body>
        <Card.Text>Date: {publicationDate}</Card.Text>
        <Card.Text>Content: {content}</Card.Text>
        <Card.Body>
          Image: <img src={imageUrl} alt="postimage" style={{ width: '200px' }} />
        </Card.Body>
        {/* <Card.Footer>User Id: {rareUserId.first_name} {rareUserId.last_name}</Card.Footer> */}
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/post/edit/${id}`);
        }}
      >
        Edit Post
      </Button>
      <Button onClick={deleteThisPost}>Delete Post</Button>
    </Card>
  );
};
PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  rareUserId: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  OnUpdate: PropTypes.func.isRequired,
};

export default PostCard;
