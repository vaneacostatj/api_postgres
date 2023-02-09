const {Strategy} = require('passport-local')
const userService = require('../../../services/user_services')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const service = new userService()

const localStrategy = new Strategy({
  usernameField:'email',
  passwordField: 'password'
  },async (email, password, done)=>{
  try {
    const user = await service.findEmail(email)
    if (!user) {
      return done(boom.unauthorized(), false)
    }
    //comparación de password
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return done(boom.unauthorized(), false)
    }
    delete user.dataValues.password
    return done(null, user)
  } catch (error) {
    done(error, false)
  }
})

module.exports = localStrategy
