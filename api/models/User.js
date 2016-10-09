module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },



    regNo : {
      type : 'string'
    },

    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },

    branch : {
      type : 'string'
    },

    role : {
      type : 'string'
    },

    position : {
      type : 'string'
    },

    contact : {
      type : 'integer'
    },

    domain : {
      type : 'string'
    },



    encryptedPassword: {
      type: 'string'
    },


    admin: {
      type: 'boolean',
      defaultsTo: false
    },








    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation1;
      delete obj._csrf;
      return obj;
    }

  } ,

    beforeValidation: function (values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else  if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  },

   beforeCreate: function (values, next) {
     if (!values.password || values.password != values.confirmation) {
       return next({err: ["Password doesn't match password confirmation."]});
     }

     require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
       if (err) return next(err);
       values.encryptedPassword = encryptedPassword;

       next();
     });
   }


};
