const boom = require("@hapi/boom");
const { models } = require('../libs/sequelize')
const bcrypt = require ('bcrypt')

class UserServices {

  constructor(){

  }

  async create(data){
    const hash = await bcrypt.hash(data.password,10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    })
    delete newUser.dataValues.password;
    return newUser
  }

  async find(){
    const response = await models.User.findAll()
    return response
  }

  async findEmail(email){
    const response = await models.User.findOne({
      where: {email}
    })
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
