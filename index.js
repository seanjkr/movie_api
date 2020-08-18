const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');


const app = express();

app.use(morgan('common'));

app.use(bodyParser.json());

app.use(express.static('public'));

let movies = [
  {
    title: 'Fight Club',
    director: 'David Fincher',
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.'
  },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    director: 'Michel Gondry',
    description: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.'
  },
  {
    title: 'Princess Mononoke',
    director: 'Hayao Miyazaki',
    description: 'On a journey to find the cure for a Tatarigami\'s curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.'
  },
  {
    title: 'Wristcutters: A Love Story',
    director: 'Goran Dukic',
    description: 'A film set in a strange afterlife way station that has been reserved for people who have committed suicide.'

  },
  {
    title: 'What We Do in the Shadows',
    director: 'Taika Watiti',
    description: 'Viago, Deacon and Vladislav are vampires who are finding that modern life has them struggling with the mundane - like paying rent, keeping up with the chore wheel, trying to get into nightclubs and overcoming flatmate conflicts.'
  },
  {
    title: 'Spirited Away',
    director: 'Hayao Miyazaki',
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.'
  },
  {
    title: 'Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson',
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.'
  },
  {
    title: 'Lord of the Rings: The Two Towers',
    director: 'Peter Jackson',
    description: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.'
  },
  {
    title: 'Lord of the Rings: The Return of the King',
    director: 'Peter Jackson',
    description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.'
  },
  {
    title: 'Howl\'s Moving Castle',
    director: 'Hayao Miyazaki',
    description: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.'
  },
  {
    title: 'The Departed',
    director: 'Martin Scorsese',
    description: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.'
  }
]

let directors = [
  {
    name: 'Hayao Miyazaki'
  },
  {
    name: 'Peter Jackson'
  },
  {
    name: 'Martin Scorsese'
  },
  {
    name: 'Taika Watiti'
  }
]

let users = [
  {
    name: 'Sean Kopp-Reddy',
    birthday: '04/02/1992'
  }
]

let genres = [
  {
    name: 'Action'
  }
]

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title
  }));
});

app.get('/genres/:name', (req, res) => {
  res.json( genres.find((genre) => {
    return genre.name === req.params.name
  }));
});

app.get('/directors/:name', (req, res) => {
  res.json( directors.find((director) => {
    return director.name === req.params.name
  }));
});

app.post('/users', (req, res) => {
  let newUser = req.body;

  if(!newUser.name) {
    const message = 'Missing user name!';
    res.status(400).send(message);
  } else {
    users.push(newUser);
    res.status(201).send('You have registered!' + newUser);
  }
});

app.put('/users/:name', (req, res) => {
  let user = user.find((user) => { return user.name === req.params.name });

  if (user) {
    res.status(201).send('Your info has been updated!');
  } else {
    res.status(404).send('User was not found.');
  }
});

app.put('/users/:name/favorites', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    res.status(201).send('This movie has been added to your favorites!');
  } else {
    res.status(404).send('User was not found.');
  }
});

app.delete('/users/:name/favorites', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    res.status(201).send('This movie was deleted from your favorites.');
  }
});

app.delete('/users/:name', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    res.status(201).send('Your account was deleted.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oh snap!');
});

app.listen(8080, () => {
console.log('My app is listening on port 8008.');
});
