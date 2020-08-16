const express = require('express'),
  morgan = require('morgan');


const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

let topMovies = [
  {
    title: 'Fight Club',
    director: 'David Fincher'
  },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    director: 'Michel Gondry'
  },
  {
    title: 'Princess Mononoke',
    director: 'Hayao Miyazaki'
  },
  {
    title: 'Wristcutters: A Love Story',
    director: 'Goran Dukic'
  },
  {
    title: 'What We Do in the Shadows',
    director: 'Taika Watiti'
  },
  {
    title: 'Spirited Away',
    director: 'Hayao Miyazaki'
  },
  {
    title: 'Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson'
  },
  {
    title: 'Lord of the Rings: The Two Towers',
    director: 'Peter Jackson'
  },
  {
    title: 'Lord of the Rings: The Return of the King',
    director: 'Peter Jackson'
  },
  {
    title: 'Howl\'s Moving Castle',
    director: 'Hayao Miyazaki'
  },
]

app.get('/', (req, res) => {
  res.send('Movie time!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oh snap!');
});

app.listen(8080, () => {
console.log('My app is listening on port 8008.');
});
