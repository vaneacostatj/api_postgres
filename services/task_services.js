const boom = require("@hapi/boom");
//const getConnection = require('../libs/postgres')
//const pool = require('../libs/postgres.pool')
//const sequelize = require('../libs/sequelize')
const { models } = require('../libs/sequelize') //al activar el setupModels el crea un espacio reservado que se llama models y guaradara los modelos

class TaskServices {

  constructor(){

  }

  async create(data){
    const newTask = await models.Task.create(data)
    return newTask
  }

  async find(){
    // const client = await getConnection()
    // const response = await client.query('SELECT * FROM task')
    // return response.rows

    // const query = 'SELECT * FROM task'
    // const {data} = await sequelize.query(query);

    const response = await models.Task.findAll()
    return response
  }

  async findOne(id){
    const task = await models.Task.findByPk(id);

    if(!task){
      //control de errores
      throw boom.notFound('task not found')
    }

    //si la tarea esta bloqueada
    if(task.isBlock){
      throw boom.conflict('task is block')
    }
    return task
  }

  async findByUser(userId){
    const task = await models.Task.findAll({
      where: { user_id : userId }
    });
    return task
  }

  async update(id, changes){
    const task = await this.findOne(id);
    const response = await task.update(changes)
    return response
  }

  async delete(id){
    const task = await models.Task.findByPk(id);

    if(!task){
      throw boom.notFound('task not found')
    }

    await task.destroy();
    return { id };
  }
}

module.exports = TaskServices;
