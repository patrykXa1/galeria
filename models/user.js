const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  imie: String,
  nazwisko: String,
  username: String,
  password: String,
}, { collection: 'users' });

module.exports = mongoose.model('Users', userSchema);
