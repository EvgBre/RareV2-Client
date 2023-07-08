import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createPost, updatePost } from '../../utils/data/postData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  imageUrl: '',
  publicationDate: '',
  content: '',
  tags: '',
};

const PostForm = ({ obj }) => {
  const [currentPost, SetCurrentPost] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [formInput, setFormInput] = useState({ ...initialState, postId: id });

  useEffect(() => {
    if (obj.id) {
      SetCurrentPost({
        id: obj.id,
        title: obj.title,
        imageUrl: obj.image_url,
        publicationDate: obj.publication_date,
        content: obj.content,
        rareUserId: user.uid,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({

      // TAKES WHATEVER THE PREVIOUS VALUE WAS.
      ...prevState,
      [name]: value,
    }));

    if (name === 'rareUserId' && !Number.isInteger(Number(value))) {
      return;
    }

    SetCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (obj.id) {
      const postUpdate = {
        id: obj.id,
        title: currentPost.title,
        imageUrl: currentPost.imageUrl,
        publicationDate: currentPost.publicationDate,
        content: currentPost.content,
        rareUserId: user.uid,
      };

      updatePost(postUpdate)
        .then(() => router.push('/post'));
    } else {
      const posts = {
        title: currentPost.title,
        imageUrl: currentPost.imageUrl,
        publicationDate: currentPost.publicationDate,
        content: currentPost.content,
        rareUserId: user.uid,
      };

      createPost(posts).then(() => router.push('/post'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentPost.title} onChange={handleChange} type="string" />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control name="content" required value={currentPost.content} onChange={handleChange} type="string" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control name="imageUrl" required value={currentPost.imageUrl} onChange={handleChange} type="string" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date Created</Form.Label>
          <Form.Control name="publicationDate" required value={currentPost.publicationDate} onChange={handleChange} type="string" />
        </Form.Group>
        <Form.Check
          className="text-black mb-3"
          style={{ margin: '10px' }}
          type="checkbox"
          id="checkbox"
          name="news"
          label="News"
          checked={formInput.news}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              news: e.target.checked,
            }));
          }}
        />
        <Form.Check
          className="text-black mb-3"
          style={{ margin: '10px' }}
          type="checkbox"
          id="checkbox"
          name="funny"
          label="Funny"
          checked={formInput.funny}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              funny: e.target.checked,
            }));
          }}
        />
        <Form.Check
          className="text-black mb-3"
          style={{ margin: '10px' }}
          type="checkbox"
          id="checkbox"
          name="learning"
          label="Learning"
          checked={formInput.learning}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              learning: e.target.checked,
            }));
          }}
        />
        <Form.Check
          className="text-black mb-3"
          style={{ margin: '10px' }}
          type="checkbox"
          id="checkbox"
          name="finance"
          label="Finance"
          checked={formInput.finance}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              finance: e.target.checked,
            }));
          }}
        />
        <Form.Check
          className="text-black mb-3"
          style={{ margin: '10px' }}
          type="checkbox"
          id="checkbox"
          name="health"
          label="Health"
          checked={formInput.health}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              health: e.target.checked,
            }));
          }}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    image_url: PropTypes.string,
    publication_date: PropTypes.string,
    tags: PropTypes.bool,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
export default PostForm;
