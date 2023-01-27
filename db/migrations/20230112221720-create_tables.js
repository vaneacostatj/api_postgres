'use strict';

const {TaskSchema, TASK_TABLE} = require('../models/task.model')
const {UserSchema, USER_TABLE} = require('../models/user.model')
const {TaskListSchema, TASKLIST_TABLE} = require('../models/taskList.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema),
    await queryInterface.createTable(TASKLIST_TABLE, TaskListSchema),
    await queryInterface.createTable(TASK_TABLE, TaskSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE),
    await queryInterface.dropTable(TASKLIST_TABLE),
    await queryInterface.dropTable(TASK_TABLE)
  }
};
