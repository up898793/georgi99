const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, forwardAuthenticated1, ensureAuthenticated1} = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);



module.exports = router;
