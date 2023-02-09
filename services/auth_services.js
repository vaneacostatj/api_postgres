const userService = require('./user_services')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {config}=require('../config/config')

const secret = config.jwtScret;
const service = new userService()

class AuthService {
  async getUser(email, password){
    const user = await service.findEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    //comparación de password
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      throw boom.unauthorized()
    }
    delete user.dataValues.password
    return user
  }

  signToken(user){
    const payload = {
      sub:user.id,
      role: 'admin'//role:user.role
    }
    const token = jwt.sign(payload, secret)
    return {
      user,
      token
    }
  }

  async sendRecovery(email){
    const user = await service.findEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    //------- Cambio de contraseña por medio del nodeMail

    //-------- Pendiente
  }

  async sendMail(email){

    //------- Implementación del envio de email con nodeMail

    //-------- Pendiente
  }
}

module.exports = AuthService
