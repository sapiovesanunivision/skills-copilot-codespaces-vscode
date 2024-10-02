// Create web server
const express = require('express');
const app = express();
const port = 3000;
// Import comments file
const comments = require('./comments');
// Import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Create route to get all comments
app.get('/comments', (req, res) => {
  res.send(comments.getComments());
});
// Create route to get comments by user
app.get('/comments/:username', (req, res) => {
  const username = req.params.username;
  res.send(comments.getCommentsByUser(username));
});
// Create route to post a comment
app.post('/comments', (req, res) => {
  const username = req.body.username;
  const text = req.body.text;
  if (username && text) {
    comments.addComment(username, text);
    res.send('Comment added');
  } else {
    res.status(400).send('Please include a username and text');
  }
});
// Create route to delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  if (comments.deleteComment(id)) {
    res.send('Comment deleted');
  } else {
    res.status(404).send('Comment not found');
  }
});
// Start web server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});