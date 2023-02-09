const express = require('express')
const TaskListServices = require('../services/taskList_services')
const { createTaskListSchema, updateTaskListSchema, getTaskList } = require('../schemas/taskListSchema')
const validatorHandler = require('../middlewares/validator.handler')
const passport = require('passport')
const {checkAdminRole, checkRoles} = require('../middlewares/auth.handler')

const router = express.Router();
const service = new TaskListServices;

router.get('/',
  passport.authenticate('jwt', {session:false}),
  async (req, res)=> {
    const task = await service.find()
    res.json(task)
  }
)

router.get('/:id',
  passport.authenticate('jwt', {session:false}),
  validatorHandler(getTaskList, 'params'),
  async (req, res)=> {
    const { id } = req.params;
    const task = await service.findOne(id);
    res.json(task)
  }
)

router.post('/create',
  passport.authenticate('jwt', {session:false}),
  checkRoles('admin','cajero'),
  validatorHandler(createTaskListSchema, 'body'),
  async (req, res)=> {
    const body = req.body;
    const newTask = await service.create(body)
    res.status(201).json(newTask)
  }
)

router.post('/update/:id',
  passport.authenticate('jwt', {session:false}),
  validatorHandler(getTaskList, 'params'),
  validatorHandler(updateTaskListSchema, 'body'),
  async (req, res)=> {
    const { id } = req.params;
    const body = req.body;
    const updateTask = await service.update(id,body)
    res.status(201).json(updateTask)
  }
)

router.get('/delete/:id',
  passport.authenticate('jwt', {session:false}),
  validatorHandler(getTaskList, 'params'),
  async (req, res)=> {
    const { id } = req.params;
    const task = await service.delete(id)
    res.status(201).json({
      message: 'deleted',
      task
    })
  }
)

module.exports = router
