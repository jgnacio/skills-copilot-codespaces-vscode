// Create web server

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create an express application
const app = express();

// Enable CORS
app.use(cors());

// Parse body of incoming requests
app.use(bodyParser.json());

// Create an array to store comments
const commentsByPostId = {};

// Create an endpoint to get all comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create an endpoint to create a comment
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');

  // Get the comment from the request body
  const { content } = req.body;

  // Get the array of comments for this post
  const comments = commentsByPostId[req.params.id] || [];

  // Add the new comment to the array
  comments.push({ id: commentId, content });

  // Add the array of comments back to the object
  commentsByPostId[req.params.id] = comments;

  // Send back the new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});