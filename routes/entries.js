const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Entry = require('../models/Entry')

// @desc    Show add page
// @route   GET /entries/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('entries/add')
})

// @desc    Process add form
// @route   POST /entries
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Entry.create(req.body)
    res.redirect('/journal')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show all entries
// @route   GET /entries
router.get('/', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('entries/index', {
      entries
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show edit page
// @route   GET /entries/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const entry = await Entry.findOne({
    _id: req.params.id
  }).lean()

  if (!entry) {
    return res.render('error/404')
  }

  if (entry.user != req.user.id) {
    res.redirect('/entries')
  } else {
    res.render('entries/edit', {
      entry,
    })
  }
})

module.exports = router