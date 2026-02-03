const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

router.get('/', auth, async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const status = req.query.status || 'all';
    const filter = { owner: req.user.id };
    if (q) filter.$or = [ { title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } } ];
    if (status && status !== 'all') filter.status = status;
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
});

router.post('/', auth, [ body('title').isLength({ min: 1 }).withMessage('Title required'), body('content').optional().isLength({ min: 3 }).withMessage('Content too short') ], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, content, status } = req.body;
    const note = new Note({ title, content, status: status || 'pending', owner: req.user.id });
    await note.save();
    res.json(note);
  } catch (err) { next(err); }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: 'Not found' });
    res.json(note);
  } catch (err) { next(err); }
});

router.put('/:id', auth, [ body('title').optional().isLength({ min: 1 }).withMessage('Title required'), body('content').optional().isLength({ min: 3 }).withMessage('Content too short'), body('status').optional().isIn(['pending','completed']).withMessage('Invalid status') ], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, content, status } = req.body;
    const update = {};
    if (typeof title !== 'undefined') update.title = title;
    if (typeof content !== 'undefined') update.content = content;
    if (typeof status !== 'undefined') update.status = status;
    const note = await Note.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, update, { new: true });
    if (!note) return res.status(404).json({ message: 'Not found' });
    res.json(note);
  } catch (err) { next(err); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
