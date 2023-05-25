var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//all routes start with /api

function sendUpdatedResults(req, res) {
  db("SELECT * FROM trips ORDER BY from_date ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

router.get("/trips", (req, res) => {
  // Send back the full list of items
  sendUpdatedResults(req, res);
});

router.get("/trips/:id", (req, res) => {
  db(`SELECT * FROM trips WHERE id = ${req.params.id};`)
    .then(results => {
      res.send(results.data[0]);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/trips", (req, res) => {
  let { location, from_date, to_date, img, withwho, description } = req.body;
  db(
    `INSERT INTO trips (location, from_date, to_date, img, withwho, description) VALUE ("${location}", "${from_date}","${to_date}","${img}", "${withwho}", "${description}");`
  )
    .then(results => {
      sendUpdatedResults(req, res);
    })
    .catch(err => res.status(500).send(err));
});

router.put("/trips/:id", (req, res) => {
  db(`UPDATE trips SET done = TRUE WHERE id = ${req.params.id} ;`)
    .then(results => {
      sendUpdatedResults(req, res);
    })
    .catch(err => res.status(500).send(err)); //
});

router.delete("/trips/:id", (req, res) => {
  // URL params are available in req.params
  db(`DELETE FROM trips WHERE id = ${req.params.id};`)
    .then(results => {
      sendUpdatedResults(req, res);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
