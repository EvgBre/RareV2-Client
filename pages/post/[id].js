/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getCommentsByPostId } from '../../utils/data/commentData';
import CommentCard from '../../components/comment/CommentCard';

export default function PostComment() {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const { id } = router.query;

  const getAllComments = () => {
    getCommentsByPostId(id).then((data) => setComments(data));
  };

  useEffect(() => {
    console.warn(id);
    getAllComments();
  }, []);

  return (
    <div>
      <h2>Post Comment</h2>
      <Button onClick={() => {
        router.push({
          pathname: '/comments/new',
          query: {
            postId: id,
          },
        });
      }}
      >
        Add a Comment
      </Button>
      {comments.map((comment) => (
        <section key={`comment--${comment.id}`} className="comment">
          <CommentCard
            content={comment.content}
            postId={comment.post_id}
            authorId={comment.author_id}
            createdOn={comment.created_on}
            id={comment.id}
            onUpdate={getAllComments}
          />
        </section>
      ))}
    </div>
  );
}
