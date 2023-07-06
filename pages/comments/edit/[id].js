import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleComment } from '../../../utils/data/commentData';
import CommentForm from '../../../components/comment/CommentForm';

export default function EditComment() {
  const [editComment, setEditComment] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleComment(id).then((obj) => { setEditComment(obj); });
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Comment</title>
      </Head>
      <div>
        <CommentForm obj={editComment} />
      </div>
    </>
  );
}
