const {Task, TaskSchema} = require('./task.model')
const {TaskList, TaskListSchema} = require('./taskList.model')
const {User, UserSchema} = require('./user.model')

function setupModels(sequelize) {
  Task.init(TaskSchema, Task.config(sequelize));
  TaskList.init(TaskListSchema, TaskList.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  Task.associate(sequelize.models)
  TaskList.associate(sequelize.models)
  User.associate(sequelize.models)
}

module.exports = setupModels
