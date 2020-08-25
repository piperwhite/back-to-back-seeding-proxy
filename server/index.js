// Dependency
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 8888;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/rooms/:room_id', express.static('public'));

/* Route for Photo Gallery Component */

// GET request to '/properties/:id' route
app.get('/properties/:id', (req, res) => {
  let room_id = req.params.id;
  axios.get(`http://18.191.221.206:3001/properties/${room_id}`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

/* Route for Calendar Component */

// GET request to '/rooms/:room_id/reservation' route
app.get('/rooms/:room_id/reservation', (req, res) => {
  let room_id = req.params.room_id;
  axios.get(`http://3.134.88.239:3002/rooms/${room_id}/reservation`)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// POST request to '/rooms/:room_id/reservation' route
app.post('/rooms/:room_id/reservation', (req, res) => {
  let room_id = req.params.room_id;
  // declare the reservation data to post
  let reservation = {
    check_in: req.body.check_in,
    check_out: req.body.check_out
  }
  axios.post(`http://3.134.88.239:3002/rooms/${room_id}/reservation`, reservation)
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

/* Route for Reviews Component */

// GET request to '/reviews' route
app.get('/reviews', (req, res) => {
  axios.get('http://13.52.214.87:3003/reviews')
    .then((response) => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// GET request to '/reviews/users' route
app.get('/reviews/users', (req, res) => {
  axios.get('http://13.52.214.87:3003/reviews/users')
    .then((response) => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// GET request to '/reviews/houses' route
app.get('/reviews/houses', (req, res) => {
  axios.get('http://13.52.214.87:3003/reviews/houses')
    .then((response) => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// GET request to '/reviews/comments' route
app.get('/reviews/comments', (req, res) => {
  axios.get('http://13.52.214.87:3003/reviews/comments')
    .then((response) => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// /* Route for Image Carousel Component */

// GET request to '/suggestedListings' route
app.get('/suggestedListings', (req, res) => {
  axios.get('http://52.32.67.233:3004/suggestedListings')
    .then((response) => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});