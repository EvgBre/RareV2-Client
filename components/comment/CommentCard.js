import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deleteComment, getUserForComments } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';

const CommentCard = ({
  id,
  authorId,
  content,
  createdOn,
  onUpdate,
  userName,
}) => {
  const deleteThisComment = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };

  const router = useRouter();
  const { user } = useAuth();
  const { rareUser, setRareUser } = useState({});

  useEffect(() => {
    getUserForComments(user.uid).then((data) => {
      setRareUser(data[0]);
    });
  }, [user.uid]);

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Text>By: {authorId.firstName} {authorId.lastName}</Card.Text>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        <Card.Footer>Created On: {createdOn}
          User: {userName}
        </Card.Footer>
        { rareUser.id === authorId
          ? (
            <>
              <Button onClick={() => {
                router.push(`comments/edit/${id}`);
              }}
              >Edit
              </Button>
              <Button onClick={deleteThisComment}>Delete
              </Button>
            </>
          ) : ''}
      </Card>
    </>
  );
};

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
