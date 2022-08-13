const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

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
router.get('/profile', ensureAuth, (req, res) => {
  console.log(req.user)
  res.render('profile')
})

module.exports = router