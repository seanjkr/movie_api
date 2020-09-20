const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, require: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
  },
  ImagePath: String,
  Featured: Boolean
});

let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, require: true},
  Birth: String
});

let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, require: true}
});

let userSchema = mongoose.Schema({
  Username: {type: String, require: true},
  Password: {type: String, require: true},
  Email: {type: String, require: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password)
};


let Movie = mongoose.model('Movie', movieSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre', genreSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
