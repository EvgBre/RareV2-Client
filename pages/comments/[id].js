import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getCommentsByPostId } from '../../utils/data/commentData';
import CommentCard from '../../components/comment/CommentCard';

export default function ViewComment() {
  const [commentDetails, setCommentDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const showComments = () => {
    getCommentsByPostId(id).then((data) => setCommentDetails(data));
  };

  useEffect(() => {
    showComments();
  }, []);

  return (
    <article className="comments">
      <h2>Comments</h2>
      <Button onClick={() => {
        // Navigate to the "/comments/new" page with the "postId" query parameter set to "id"
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

      {/* Loop through the "comments" array and render each comment */}
      {commentDetails.map((comment) => (
        <section key={`comment--${comment.id}`} className="comment">
          {/* Pass comment data as props to the "CommentCard" component */}
          <CommentCard
            id={comment.id}
            authorId={comment.author_id}
            postId={comment.post_id}
            content={comment.content}
            createdOn={comment.created_on}
            onUpdate={showComments} // Pass the "showComments" function as a prop to handle comment updates
            commenterName={comment.commenter_name}
          />
        </section>
      ))}
    </article>
  );
}
