const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./vars');
const User = require('../api/models/user.model');
const Admin = require('../api/models/admin.model');

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const userData = await User.findById(payload.sub);
    const user = userData ? userData: await Admin.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

// const oAuth = (service) => async (token, done) => {
//   try {
//     const userData = await authProviders[service](token);
//     const user = await User.oAuthLogin(userData);
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// };

exports.jwt = new JwtStrategy(jwtOptions, jwt);
// exports.facebook = new BearerStrategy(oAuth('facebook'));
// exports.google = new BearerStrategy(oAuth('google'));
