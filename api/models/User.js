/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    // regNo : {
    //   type : 'string',
    //   required: true,
    // },

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    // branch : {
    //   type : 'string',
    //   required : true,
    // },
    //
    // role : {
    //   type : 'string',
    //   required : true,
    // },
    //
    // position  : {
    //   type : 'string',
    //   required : true,
    // },
    //
    // url : {
    //   type : 'string',
    //   required : true,
    // },
    //
    // contact : {
    //   type : 'number',
    //   required : true,
    // },
    //
    // domain : {
    //   type : 'string',
    //   required : true,
    // },


    encryptedPassword: {
      type: 'string'
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    online : {
      type : 'boolean',
      defaultsTo : false
    },

    // online: {
    //   type: 'boolean',
    //   defaultsTo: false
    // },
    //




    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }

  },

  beforeValidation: function (values, next) {
    console.log(values)
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else  if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  },

  // beforeCreate : function(values, next){




    // if(values.pasword != values.confirmation) {
    //   return next({err : ["Password doesn't match with password confirmation.Check User.js"]});
    // }
    // require('bcrypt').hash(values.password,10,function passwordEncrypted(err, encryptedPassword){
    //   if(err) return next(err);
    //   values.encryptedPassword = encryptedPassword;
    //   next();
    // });
  // }
  //--!!NOT WORKING!!--

};
