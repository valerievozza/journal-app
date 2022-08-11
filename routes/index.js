const express = require('express')
const router = express.Router()

// @desc    Landing page
// @route   GET /
router.get('/', (req, res) => {
  res.render('main')
})

// @desc    Login
// @route   GET /login
router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'login'
  })
})

// @desc    User homepage
// @route   GET /home
router.get('/home', (req, res) => {
  res.render('home')
})

module.exports = router