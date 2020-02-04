const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  // Reference the user schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  //   Profile details
  race: {
    type: String,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  totalGames: {
    type: Number
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
