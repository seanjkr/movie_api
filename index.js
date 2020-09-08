const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  models = require('./models.js');

const Movies = models.Movie,
 Users = models.User,
 Genres = models.Genre,
 Directors = models.Director;

const app = express();

mongoose.connect('mongodb://localhost:27017/myMoviesDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('common'));

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/movies', (req, res) => {
  Movies.find().then((Movies) => {
    res.status(201).json(Movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.get('/movies/:title', (req, res) => {
  Movies.findOne({Title : req.params.title}).then((Movies) => {
    res.status(201).json(Movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.get('/movies/genre/:name', (req, res) => {
  Movies.find({'Genre.Name' : req.params.name}).then((Movies) => {
    res.status(201).json(Movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.get('/movies/director/:name', (req, res) => {
  Movies.find({'Director.Name' : req.params.name}).then((Movies) => {
    res.status(201).json(Movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.get('/genres', (req, res) => {
  Genres.find().then((Genres) => {
    res.status(201).json(Genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.get('/directors', (req, res) => {
  Directors.find().then((Directors) => {
    res.status(201).json(Directors);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.get('/genres/:name', (req, res) => {
  Genres.findOne({Name : req.params.name}).then((Genres) => {
    res.status(201).json(Genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.get('/directors/:name', (req, res) => {
  Directors.findOne({Name : req.params.name}).then((Directors) => {
    res.status(201).json(Directors);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err)
  });
});

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username }).then((user) => {
    if(user) {
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {res.status(201).json(user)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

app.put('/users/:name', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.name }, {$set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new : true},
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

app.post('/users/:name/movies/:movieID', (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.name }, { $push : { FavoriteMovies : req.params.movieID }},
    { new : true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
  });
});

app.delete('/users/:name/movies/:movieID', (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.name }, { $pull : { FavoriteMovies : req.params.movieID }},
    { new : true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
  });
});

app.delete('/users/:name', (req, res) => {
  Users.findOneAndRemove({ Username : req.params.name }).then((user) => {
    if (!user) {
      res.status(400).send(req.params.name + ' was not found.');
    } else {
      res.status(200).send(req.params.name + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oh snap!');
});

app.listen(8080, () => {
console.log('My app is listening on port 8008.');
});
