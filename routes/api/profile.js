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
    const { race, teamName } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    // Check fields exist
    if (race) profileFields.race = race;
    if (teamName) profileFields.teamName = teamName;

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

module.exports = router;
