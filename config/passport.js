var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const User=require("../mongodb/schemas/userschema");
const config=require("./config");


module.exports = function(passport) {

    console.log("----------------------------------------");
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
    opts.secretOrKey = config.secret;
    console.log(config.secret);
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload.id);
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              console.log("----------------------------------------------");
              console
              
    
              
              console.log("---------------------------------------------");
              done(null, user);
          } else {
              done(null, false);
          }
      });
    }));
    };