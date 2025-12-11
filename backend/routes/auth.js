const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
var JWT_SECRET = '$rahul$arorak$';

//create a user using: post "/api/auth/createuser".
router.post(
  '/createuser',
  [
    body('name', 'Enter a Valid name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Please password atleast of 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are error , return bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      // Check wheter the user with same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ sucess: false, error: [{ msg: 'User Already Exists' }] });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      let newuser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: newuser.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Something Went Wrong' }] });
    }
  },
);

//Authanticate a user using: post "/api/auth/createuser".

router.post(
  '/login',
  [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', "Password can't be blanked").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: [{ msg: 'Please try to login with correct credentials' }],
        });
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(400).json({
          error: [{ msg: 'Please try to login with correct credentials' }],
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      return res.status(500).json({ error: [{ msg: 'Something Went Wrong' }] });
    }
  },
);

//Authanticate a user using: post "/api/auth/createuser". LOgin required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const getuser = await User.findById(userId).select('-password');
    res.send(getuser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: [{ msg: 'Something Went Wrong' }] });
  }
});

module.exports = router;
