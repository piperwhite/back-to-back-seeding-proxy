// Dependency
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/rooms/:room_id', express.static('public'));


/* Route for Calendar Component */

// GET request to '/rooms/:room_id/reservation' route
app.get('/rooms/:room_id/reservations', (req, res) => {
  let room_id = req.params.room_id;
  axios.get(`http://3.84.237.14:3002/rooms/${room_id}/reservations`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// POST request to '/rooms/:room_id/reservation' route
app.post('/rooms/:room_id/reservations', (req, res) => {
  let room_id = req.params.room_id;
  // declare the reservation data to post
  let reservation = {
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    guests: req.body.guests,
    room_id: req.body.room_id,
    user_id: req.body.user_id
  }
  axios.post(`http://3.84.237.14:3002/rooms/${room_id}/reservations`, reservation)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

/* Route for loaderio */
app.get('/loaderio-83dc117556c7f94eeadc7d6b4a6ab1ba', (req, res) => {
  res.sendFile(__dirname+'/loaderio-83dc117556c7f94eeadc7d6b4a6ab1ba.txt');
});

// Start server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});