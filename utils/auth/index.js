const passport = require('passport')
const localStrategy = require('./strategies/local.strategy')
const jwtStrategy = require('./strategies/jwt.strtegy')

passport.use(localStrategy)
passport.use(jwtStrategy)
