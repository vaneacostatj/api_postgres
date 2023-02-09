const express = require('express')
const passport = require('passport')
const authService = require('../services/auth_services')

const router = express.Router();
const service = new authService()


router.post('/login',
  passport.authenticate('local', {session:false}),
  async (req, res, next)=> {
    try {
      const user = req.user
      res.json(service.signToken(user))
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router
