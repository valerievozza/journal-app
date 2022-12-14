const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Entry = require('../models/Entry')
const Note = require('../models/Note')
const User = require('../models/User')

// @desc    Show user journal
// @route   GET /user/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const user = await User.find({
      _id: req.params.id
    })
      .lean()

    const entries = await Entry.find({
      user: req.params.id,
      status: 'public',
    })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('journal', {
      user, entries
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show description page
// @route   GET /user/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const user = await Entry.findOne({
      _id: req.params.id
    }).lean()
  
    if (!entry) {
      return res.render('error/404')
    }
  
    if (entry.user != req.user.id) {
      res.redirect('/')
    } else {
      res.render('user/edit', {
        description,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Update entry
// @route   PUT /entries/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.id).lean()

    if (!entry) {
      return res.render('error/404')
    }

    if (entry.user != req.user.id) {
      res.redirect('/entries')
    } else {
      entry = await Entry.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
      })

      res.redirect('/journal')
    }
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Delete entry
// @route   DELETE /entries/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Entry.remove({ _id: req.params.id })
    res.redirect('/journal')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    User entries
// @route   GET /entries/user/:userId

//! CHANGE THIS TO RENDER PUBLIC USER JOURNAL PAGE
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('journal', {
      entries,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router