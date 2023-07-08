import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CommentCard from '../../components/comment/CommentCard';
import { getComments } from '../../utils/data/commentData';

function CommentsHome() {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const getAllComments = () => {
    getComments().then((data) => setComments(data));
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <article className="comments">
      <Button
        onClick={() => {
          router.push('/comments/new');
        }}
      >Add Comment
      </Button>
      {comments.map((comment) => (
        <section key={`comments--${comments.id}`} className="comment">
          <CommentCard commentObj={comment} onUpdate={getAllComments} />
        </section>
      ))}
    </article>
  );
}

export default CommentsHome;
