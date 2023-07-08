import { useRouter } from 'next/router';
import Head from 'next/head';
import CommentForm from '../../components/comment/CommentForm';

export default function NewEvent() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      <Head>
        Create Comment
      </Head>
      <CommentForm postId={postId} />
    </div>
  );
}
