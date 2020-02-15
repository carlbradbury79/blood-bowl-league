const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Get Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'No profile for user' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/profile/me
// @desc Create or update profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('race', 'Team is required')
        .not()
        .isEmpty(),
      check('teamName', 'Team name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { race, teamName, teamValue, teamTreasury } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    // Check fields exist
    console.log('api', race, teamName, teamValue, teamTreasury);
    if (race) profileFields.race = race;
    if (teamName) profileFields.teamName = teamName;
    if (teamValue) profileFields.teamValue = teamValue;
    if (teamTreasury) profileFields.teamTreasury = teamTreasury;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // If profile found - Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //  If no profile - Create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route GET api/profile
// @desc Get ALL profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    // From model
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);

    // Loop through the profiles, showing result array
    allResults = profiles.map(item => console.log(item.results));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    // From model
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'No profile for user' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No profile for user' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/profile/results
// @desc Add game result
// @access Private

router.put(
  '/results',
  [
    auth,
    [
      check('homeTeamName', 'Home Team Name is required')
        .not()
        .isEmpty(),
      check('homeTeamScore', 'Home Team Score is required')
        .not()
        .isEmpty(),
      check('homeTeamCas', 'Home Team Casulaties are required')
        .not()
        .isEmpty(),
      check('awayTeamName', 'Away Team Name is required')
        .not()
        .isEmpty(),
      check('awayTeamScore', 'Away Team Score is required')
        .not()
        .isEmpty(),
      check('awayTeamCas', 'Away Team Casulties are required')
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      homeTeamName,
      homeTeamScore,
      homeTeamCas,
      awayTeamName,
      awayTeamScore,
      awayTeamCas
    } = req.body;

    const newResult = {
      homeTeamName,
      homeTeamScore,
      homeTeamCas,
      awayTeamName,
      awayTeamScore,
      awayTeamCas
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.results.unshift(newResult);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/profile/
// @desc Delete profile, user and posts
// @access Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route DELETE api/profile/results/:result_id
// @desc Delete result from profile
// @access Private
router.delete('/results/:result_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.results
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.results.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
