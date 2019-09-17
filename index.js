const db = require("./data/db.js");

// implement your API here
const express = require('express'); // import the express package

const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  //body is missing name or bio
  if (!newUser.name || !newUser.bio) {
      req.status(400).json({
          errorMessage: "Please provide name and bio for the user."
      })
  }
  
  db.insert(newUser)
  .then(user => {
      res.status(201).json(user);
  })
  .catch(err => {
      res.status(500).json({
      err: err,
      message: "Failed to created new user"
  })
});
});

// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);