import { clientCredentials } from '../client';

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createTag = (tag) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  })
    .then((response) => response.json())
    .then((data) => {
      console.warn('Create Tag Response:', data);
      resolve(data); // request.data from def create()
    })
    .catch((error) => {
      console.error('Create Tag Error:', error);
      reject(error);
    });
});

const getSingleTag = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTag = (tag) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tags/${tag.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  })
    .then(resolve)
    .catch(reject);
});

const deleteTag = (tag) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${tag}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createTag, getTags, getSingleTag, updateTag, deleteTag,
};
