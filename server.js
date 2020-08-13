const express = require("express")
const server = express()
const PORT = 8080

// Step 2: import local file for database
const db = require("./database");

// Step 4: create a new express server and add middleware to parse json reqs
server.use(express.json())

// use shortid.generate() to make id for user post
// Step 8: import shortid or custom-id for creating user post requests
const shortid = require("shortid");
const { getUserById } = require("./database");

server.get("/", (req, res) => {
    res.json({ message: "Intro to Node.js and Express Server" });
    // res.send('Welcome to API Project One')
  });

server.get("/api/users", (req, res) => { // at /users path we a returning a list of fake users from our fake database.
      // gets a list of users from he "fake" database
      const users = db.getUsers()
      //can also do this with: const users = req.body;
      if (users) { //if users is truthy return this
          res.status(201).json(users); // correctly working, send users as json response
        } else {
          res
            .status(500)
            .json({ errorMessage: "The user's information could not be retrieved." });
        }
  });

  server.get("/api/users/:id", (req, res) => {
    // the param variable matches up to the name of our URL param above
    try{ 
      const id = req.params.id
      //get a specific user by their ID from the "fake" database
      const user = db.getUserById(id)

    //make sure the system doesnt break if someone calls the endpoint with
    // a user ID that doesnt exist in the database
    if (user) {
        res
          .status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        })
      }
    } catch(err){
      res.status(500).json({
        errorMessage: "The users information could not be retrieved"
      })
    }

      // const foundById = users.find((user) => user.id === id);

      // if (!foundById) {
      //   res
      //     .status(404)
      //     .json({ message: "The user with the specified ID does not exist." });
      // } else { 
      //     res.status(200).json(foundById)
      //   }
      // This is to make sure the system doesn't break if someone calls the endpoint with
      // a user ID that doesn't exist in the database
})

server.post("/api/users", (req, res) => {
    // const newUser = db.createUser({ id: shortid.generate(), ...req.body });
    // this creates a new user to our fake database
    const newUser = db.createUser({
      id: shortid.generate(),
      name: req.body.name,
      bio: req.body.bio
  })

  res.status(201).json(newUser)

    // if(!req.body.name || !req.body.bio){
    //     res.status(400).json({
    //         errorMessage: "Name and Bio need to be provided Please"
    //     })
    // } else {
    //   res.status(201).json(newUser)
    //     }
    
})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id
    const body = req.body;
    const currentUser = db.getUserById(id);

    // if(!body.name || !body.bio){
    //     res.status(400)
    //         .json({ errorMessage: "Please provide name and or Bio."})
    //  } else if (currentUser) {
  if(currentUser){
      db.updateUser(id, currentUser);
        res.status(200).json({
          name: "New Name",
          bio: "New Bio",
        })
     } else {
        res.status(404).json({ errorMessage: "User could not be found by that ID."})
    }

})


server.delete("/api/users/:id", (req,res) => {
    const userById = db.getUserById(req.params.id);

    if (userById) {
        try {
          db.deleteUser(req.params.id);
          res.status(204).end();
        } catch {
          res.status(500).json({
            errorMessage: "The user could not be removed",
          });
        }
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist.",
        });
      }
    });

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})