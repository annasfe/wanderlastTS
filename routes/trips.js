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

function sendUpdatedDetails(req, res) {
  db(`SELECT * FROM hotels WHERE trip_id = ${req.params.id};`)
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
  db(
    `SELECT t.*, h.*, t.id AS tripID, h.id AS hotelID FROM trips AS t LEFT JOIN hotels AS h ON t.id = h.trip_id WHERE t.id = ${req.params.id};`
  )
    .then(results => {
      console.log(results);
      res.send(makeUsefulFormat(results.data));
    })
    .catch(err => res.status(500).send(err));
});

router.post("/trips", (req, res) => {
  let { location, from_date, to_date, img, withwho, description } = req.body;
  let SQL = `INSERT INTO trips (location, from_date, to_date, img, withwho, description) VALUES ("${location}", "${from_date}","${to_date}","${img}", "${withwho}", "${description}");`;
  if (from_date === "")
    SQL = `INSERT INTO trips (location, img, withwho, description) VALUES ("${location}","${img}", "${withwho}", "${description}");`;

  db(SQL)
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

router.post("/trips/:id/hotels", (req, res) => {
  let trip_id = Number(req.params.id);
  let { name, url, price } = req.body;
  db(
    `INSERT INTO hotels (name, url, price, trip_id) VALUES ("${name}", "${url}", ${price}, ${trip_id} );`
  )
    .then(results => {
      sendUpdatedDetails(req, res);
    })
    .catch(err => res.status(500).send(err)); //
});

router.delete("/trips/hotels/:id", (req, res) => {
  // URL params are available in req.params
  db(`DELETE FROM hotels WHERE id = ${req.params.id};`)
    .then(results => {
      sendUpdatedDetails(req, res);
    })
    .catch(err => res.status(500).send(err));
});

//*** HELPER FUNCTION */

function makeUsefulFormat(sqldata) {
  // Create array of details objs
  let details = sqldata.map(item => ({
    id: item.hotelID,
    name: item.name,
    url: item.url,
    price: item.price
  }));
  if (!details[0].id) details = [];

  // Create customer obj from first array item
  let item0 = sqldata[0];
  let trip = {
    id: item0.tripID,
    location: item0.location,
    withwho: item0.withwho,
    description: item0.description,
    from_date: item0.from_date,
    to_date: item0.to_date,
    details
  };

  return trip;
}

module.exports = router;
