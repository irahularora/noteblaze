const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Note');

//  get all notes using get
router.get('/fetchnotes', fetchuser, async (req, res) => {
  const allNotes = await Notes.find({ user: req.user.id });
  res.json(allNotes);
});

// ADD A NEW NOTE USING POST REQUEST
router.post(
  '/addnotes',
  fetchuser,
  [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Please password atleast of 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // If there are error , return bad request
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      return res.status(500).json({ errors: 'Something Went Wrong' });
    }
  },
);

//UPDATING A EXISTING NOTE
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    // If there are error , return bad request
    const { title, description, tag } = req.body;

    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    // find the note to be updata
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ errors: 'Not found' });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: 'Not autherized' });
    }
    await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true },
    );
    res.json(note);
  } catch (error) {
    return res.status(500).json({ errors: 'Something Went Wrong' });
  }
});
//DELETING A EXISTING NOTE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // find the note to be delete
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ errors: 'Not found' });
    }

    //ALLOWS DELETATION IF USER OWNS THIS NOTE
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: 'Not autherized' });
    }

    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: 'Successfuly Deleted' });
  } catch (error) {
    return res.status(500).json({ errors: 'Something Went Wrong' });
  }
});

module.exports = router;
