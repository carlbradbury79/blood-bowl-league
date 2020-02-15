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
  teamValue: {
    type: Number
  },
  teamTreasury: {
    type: Number
  },
  teamTotalTd: {
    type: Number
  },
  teamTotalCas: {
    type: Number
  },
  results: [
    {
      homeTeamName: {
        type: String
      },
      homeTeamScore: {
        type: Number
      },
      homeTeamCas: {
        type: Number
      },
      awayTeamName: {
        type: String
      },
      awayTeamScore: {
        type: Number
      },
      awayTeamCas: {
        type: Number
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
