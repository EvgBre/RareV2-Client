import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { getSingleUser, updateUser } from '../utils/data/userData';

function RegisterForm({ user, updateRareUser }) {
  const initialState = {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    profileImageUrl: '',
    uid: user.uid,
  };

  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user.uid) {
      getSingleUser(id).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          id: userObj.id,
          firstName: userObj.first_name,
          lastName: userObj.last_name,
          bio: userObj.bio,
          email: userObj.email,
          profileImageUrl: userObj.profile_image_url,
        }));
        console.warn(userObj);
      });
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const User = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        email: formData.email,
        profileImageUrl: formData.profileImageUrl,
        uid: user.uid,
      };
      updateUser(User, user.uid).then(() => router.push(`/users/${id}`));
    } else {
      registerUser(formData).then(() => updateRareUser(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control as="textarea" name="firstName" required value={formData.firstName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control as="textarea" name="lastName" required value={formData.lastName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required value={formData.bio} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="url" name="profileImageUrl" required value={formData.profileImageUrl} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateRareUser: PropTypes.func,
};

RegisterForm.defaultProps = {
  updateRareUser: () => {},
};

export default RegisterForm;
