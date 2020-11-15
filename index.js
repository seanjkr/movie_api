const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  models = require('./models.js'),
  cors = require('cors'),
  passport = require('passport'); require('./passport'),
  path = require( 'path' );

const { check, validationResult} = require('express-validator');

const Movies = models.Movie,
 Users = models.User,
 Genres = models.Genre,
 Directors = models.Director;

const app = express();

const port = process.env.PORT || 8080;

// mongoose.connect('mongodb://localhost:27017/myMoviesDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect( process.env.Connection_URI, { useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());

app.use(morgan('common'));

app.use("/users", passport.authenticate('jwt', { session: false }));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use( "/client" , express.static( path.join( __dirname , "client" , "dist" )));

app.get( "/client/*" , ( req , res ) => { 
  res.sendFile( path.join( __dirname , "client" , "dist" , "index.html" ))
});

let auth = require('./auth.js')(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oh snap! Error: ' + err );
});

app.get('/movies', (req, res) => {
  Movies.find().then((Movies) => {
    res.status(201).json(Movies);
  })
});

app.get('/movies/:title', (req, res) => {
  Movies.findOne({Title : req.params.title}).then((Movies) => {
    res.status(201).json(Movies);
  })
});

app.get('/movies/genre/:name', (req, res) => {
  Movies.find({'Genre.Name' : req.params.name}).then((Movies) => {
    res.status(201).json(Movies);
  })
});

app.get('/movies/director/:name', (req, res) => {
  Movies.find({'Director.Name' : req.params.name}).then((Movies) => {
    res.status(201).json(Movies);
  })
});

app.get('/genres', (req, res) => {
  Genres.find().then((Genres) => {
    res.status(201).json(Genres);
  })
});

app.get('/directors', (req, res) => {
  Directors.find().then((Directors) => {
    res.status(201).json(Directors);
  })
});

app.get('/genres/:name', (req, res) => {
  Genres.findOne({Name : req.params.name}).then((Genres) => {
    res.status(201).json(Genres);
  })
});

app.get('/directors/:name', (req, res) => {
  Directors.findOne({Name : req.params.name}).then((Directors) => {
    res.status(201).json(Directors);
  })
});

app.post('/register', [
  check('Username', 'A Username of at least 4 characters in length is required.').isLength({min: 4}),
  check('Username', 'Username can only include letters and numbers.').isAlphanumeric(),
  check('Password', 'Password is required.').not().isEmpty(),
  check('Password', 'Password must be at least 6 characters.').isLength({min: 6}),
  check('Email', 'Please include a valid Email.').isEmail()
],(req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }).then((user) => {
    if(user) {
      return res.status(400).send('User ' + req.body.Username + ' already exists');
    } else {
      Users
        .create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {res.status(201).json(user)
        })
    }
  })
});

app.get('/users/:name', (req, res) => {
  Users.findOne({Username : req.params.name}).then((user) => {
    if (!user) {
      res.status(400).send(req.params.name + ' was not found.');
    } else {
      res.status(201).json(user);
    }
  })
});

app.put('/users/:name', [
  check('Username', 'A Username of at least 4 characters in length is required.').isLength({min: 4}),
  check('Username', 'Username can only include letters and numbers.').isAlphanumeric(),
  check('Password', 'Password is required.').not().isEmpty(),
  check('Password', 'Password must be at least 6 characters.').isLength({min: 6}),
  check('Email', 'Please include a valid Email.').isEmail()
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username: req.params.name }, {$set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
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
});

app.listen(port, '0.0.0.0', () => {
  console.log('Listening on port ' + port);
});


/* app.listen(8080, () => {
  console.log('My app is listening on port 8080.');
}); */
