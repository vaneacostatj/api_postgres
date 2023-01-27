const boom = require("@hapi/boom");
const { models } = require('../libs/sequelize')

class TaskListServices {

  constructor(){

  }

  async create(data){
    const newTaskList = await models.TaskList.create(data)
    return newTaskList
  }

  async find(){
    const response = await models.TaskList.findAll()
    return response
  }

  async findOne(id){
    const taskList = await models.TaskList.findByPk(id);

    if(!taskList){
      throw boom.notFound('task List not found')
    }

    if(taskList.isBlock){
      throw boom.conflict('task List is block')
    }
    return taskList
  }

  async update(id, changes){
    const taskList = await this.findOne(id);
    const response = await taskList.update(changes)
    return response
  }

  async delete(id){
    const taskList = await models.TaskList.findByPk(id);

    if(!taskList){
      throw boom.notFound('task List not found')
    }

    await taskList.destroy();
    return { id };
  }
}

module.exports = TaskListServices;
