import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PostCard from '../../components/post/PostCard';
import { getPosts } from '../../utils/data/postData';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const showPosts = () => {
    getPosts().then((data) => setPosts(data));
  };
  useEffect(() => {
    showPosts();
  }, []);

  return (
    <article className="posts">
      <h1>Posts</h1>
      <Button
        onClick={() => {
          router.push('/post/new');
        }}
      >
        Register New Post
      </Button>
      {posts.map((post) => (
        <section key={`post--${post.id}`} className="post">
          <PostCard id={post.id} title={post.title} content={post.content} imageUrl={post.image_url} publicationDate={post.publication_date} onUpdate={showPosts} />
        </section>
      ))}
    </article>
  );
}

export default Home;
