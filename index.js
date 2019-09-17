const db = require("./data/db.js");

// implement your API here
const express = require('express'); // import the express package

const server = express(); // creates the server
server.use(express.json());

let newId = 0;

// handle requests to the root of the api, the / route
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio, id: Date.now()}

  if (!name || !bio) {
    res.status(400).json({
        errorMessage: "Please provide name and bio for the user"
    })
  }

  db.insert(newUser)
  .then(user => {
      res.status(201).json(user);
  })
  .catch(err => {
      res.status(500).json({
      err: err,
      message: "There was an error while saving the user to the database",
  })
});
});

server.get("/api/users", (req, res) => {
    db.find()
    .then(users => {
        res.status(201).json(users);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The users information could not be retrieved."
        })
    })
})

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(user => {
        user ? res.status(201).json(user) : res.status(404).json({message: "The user with the specified ID does not exist."})
    })
    .catch(err => {
        res.status(500).json({
            error: "The user information could not be retrieved."
        })
    })
})

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(user => {
        user ? res.status(201).json({message: `User at id ${id} was removed!`}) : res.status(404).json({message: "The user with the specified ID does not exist."})
    })
    .catch(err => {
        res.status(500).json({
            error: "The user informatmion could not be retrieved."
        })
    })
})

// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);