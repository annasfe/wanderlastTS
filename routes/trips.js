var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//all routes start with /api

router.get("/trips", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM trips ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/trips", (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  db(
    `INSERT INTO trips (location, img) VALUE ("${req.body.location}", "${req.body.img}");`
  )
    .then(results => {
      db("SELECT * FROM trips ORDER BY id ASC;")
        .then(results => {
          res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
  //
});

router.put("/trips/:id", (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // Add your code here
  //
});

router.delete("/trips/:id", (req, res) => {
  // URL params are available in req.params
  db(`DELETE FROM trips WHERE id = ${req.params.id};`)
    .then(results => {
      db("SELECT * FROM trips ORDER BY id ASC;")
        .then(results => {
          res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err)); //
});

module.exports = router;
