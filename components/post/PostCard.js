/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deletePost } from '../../utils/data/postData';
// import { useAuth } from '../../utils/context/authContext';

const PostCard = ({
  id,
  // rareUserId,
  title,
  imageUrl,
  publicationDate,
  content,
}) => {
  // const { user } = useAuth();
  const router = useRouter();

  const deleteThisPost = () => {
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => {
        // Perform any necessary actions after deleting the post
        // eslint-disable-next-line no-console

        ('Post deleted');
      });
    }
  };
  return (
    <Card className="text-center">
      <Card.Title> {title}</Card.Title>
      <Card.Body>
        <Card.Text>Date: {publicationDate}</Card.Text>
        <Card.Text> {content}</Card.Text>
        <Card.Body>
          <img src={imageUrl} alt="postimage" style={{ width: '200px' }} />
        </Card.Body>
        {/* <Card.Footer>User Id: {rareUserId.first_name} {rareUserId.last_name}</Card.Footer> */}
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/post/${id}`);
        }}
      >
        View Post
      </Button>
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
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default PostCard;
