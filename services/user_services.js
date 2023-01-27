const boom = require("@hapi/boom");
const { models } = require('../libs/sequelize')

class UserServices {

  constructor(){

  }

  async create(data){
    console.log('entro', data);
    const newUser = await models.User.create(data)
    return newUser
  }

  async find(){
    const response = await models.User.findAll()
    return response
  }

  async findOne(id){
    const user = await models.User.findByPk(id);

    if(!user){
      throw boom.notFound('user not found')
    }

    if(user.isBlock){
      throw boom.conflict('user is block')
    }
    return user
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const response = await user.update(changes)
    return response
  }

  async delete(id){
    const user = await models.User.findByPk(id);

    if(!user){
      throw boom.notFound('task List not found')
    }

    await user.destroy();
    return { id };
  }
}

module.exports = UserServices;
