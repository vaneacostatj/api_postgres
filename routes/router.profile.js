const express = require('express')
const TaskServices = require('../services/task_services')
const passport = require('passport')

const router = express.Router();
const service = new TaskServices();


router.get('/my-task',
  passport.authenticate('jwt', {session:false}),
  //vista "publica"
  async (req, res, next)=> {
    try {
      const user = req.user
      const task = await service.findByUser(user.sub)
      res.json(task)
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router
