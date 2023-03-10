const express = require('express')
const TaskServices = require('../services/task_services')
const validatorHandler = require('../middlewares/validator.handler')
const { createTaskSchema, updateTaskSchema, getTask } = require('../schemas/task.schema')
const passport = require('passport')

const router = express.Router();
const service = new TaskServices();

router.get('/',
  passport.authenticate('jwt', {session:false}),
  async (req, res, next)=> {
  try {
    const task = await service.find()
    res.json(task)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  passport.authenticate('jwt', {session:false}),
  validatorHandler(getTask, 'params'),
  async (req, res, next)=> {
    try {
      const { id } = req.params;
      const task = await service.findOne(id);
      res.json(task)
    } catch (error) {
      next(error); //para ejecutar el middlewares de tipo error
    }
  }
)

router.post('/create',
//autenticación y verificación de token
  passport.authenticate('jwt', {session:false}),
  validatorHandler(createTaskSchema, 'body'),
  async (req, res, next)=> {
    try {
      const body = req.body;
      console.log('holi', body);
      const newTask = await service.create(body)
      res.status(201).json(newTask)
    } catch (error) {
      next(error);
    }
  }
)

router.post('/update/:id',
  passport.authenticate('jwt', {session:false}),
  validatorHandler(getTask, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  async (req, res)=> {
    const { id } = req.params;
    const body = req.body;
    const updateTask = await service.update(id,body)
    res.status(201).json(updateTask)
  }
)

router.get('/delete/:id',
  passport.authenticate('jwt', {session:false}),
  async (req, res)=> {
  const { id } = req.params;
  const task = await service.delete(id)
  res.status(201).json({
    message: 'deleted',
    task
  })
})

module.exports = router
