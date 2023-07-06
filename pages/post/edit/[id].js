import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PostForm from '../../../components/post/PostForm';
import { getSinglePost } from '../../../utils/data/postData';

export default function EditPostPage() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then((obj) => {
      setEditPost(obj);
    });
  }, [id]);
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <div>
        <PostForm obj={editPost} />
      </div>
    </>
  );
}
