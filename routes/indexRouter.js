const taskRouter = require('./routerTask');
const taskListRouter = require('./routerTaskList');
const userRouter = require('./routerUser');
const express = require('express')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/Task', taskRouter);
  router.use('/TaskList', taskListRouter);
  router.use('/User', userRouter);
}

module.exports = routerApi
