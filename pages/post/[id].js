// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Button } from "react-bootstrap";
// import { getSinglePost } from "../../utils/data/postData";
// import PostCard from "../../components/post/PostCard";

// export default function ViewPost() {
//   const [postDetails, setPostDetails] = useState({});
//   const router = useRouter();
//   const { id } = router.query;

//   const showPosts = () => {
//     getSinglePost(id).then((data) => setPostDetails(data));
//   };

//   useEffect(() => {
//     showPosts();
//   }, []);

//   return (
//     <article className="posts">
//       <h2>Posts</h2>
//       <Button
//         onClick={() => {
//           // Navigate to the "/comments/new" page with the "postId" query parameter set to "id"
//           router.push({
//             pathname: '/comments/new',
//             query: {
//               postId: id,
//             },
//           });
//         }}
//       >
//         Add a Comment
//       </Button>

//       {/* Loop through the "comments" array and render each comment */}
//       {commentDetails.map((comment) => (
//         <section key={`comment--${comment.id}`} className="comment">
//           {/* Pass comment data as props to the "CommentCard" component */}
//           <CommentCard
//             id={comment.id}
//             authorId={comment.author_id}
//             postId={comment.post_id}
//             content={comment.content}
//             createdOn={comment.created_on}
//             onUpdate={showComments} // Pass the "showComments" function as a prop to handle comment updates
//             commenterName={comment.commenter_name}
//           />
//         </section>
//       ))}
//     </article>
//   );
// }
