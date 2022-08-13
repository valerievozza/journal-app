const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Entry = require('../models/Entry')

// @desc    Landing page
// @route   GET /
router.get('/', (req, res) => {
  res.render('main')
})

// @desc    Login
// @route   GET /login
router.get('/login', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  })
})

// @desc    User profile page
// @route   GET /profile
router.get('/profile', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).lean()
    res.render('profile', {
      name: req.user.firstName,
      entries
    })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router