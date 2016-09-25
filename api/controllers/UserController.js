/**
 * UserController
 *It is used for creating relation between files in view and browser.
 */

module.exports = {
  'new' : function (req, res) {

    //res.locals.flash = _.clone(req.session.flash);
    //This(res.locals.flash) is used for saving the copy of error.
    res.view();
    //req.session.flash = {};
    //This is for making error to null again.
    //If we do not do this, then same error will come again an again instead of not having that error.
  },
  /**
   * new function will relate it to the new.ejs file in view
   *name of function shoud be same as file in view
   * res.view is for sending.
   */

  create : function(req, res, next){

    // var userObj = {
    //   name: req.param('name'),
    //   email: req.param('email'),
    //   password: req.param('password'),
    //   confirmation: req.param('confirmation')
    // }
    // console.log(user.id);

    // Create a User with the params sent from
    // the sign-up form --> new.ejs

    //if(err) return next(err);

    User.create( req.params.all(), function userCreated(err, user){
        if(err) {
          //console.log(err);
        req.session.flash={
          err : err
        };
        return res.redirect('/user/new');
      }

      req.session.authenticated = true;
      req.session.User=user;
      user.online = true;

      res.redirect('/user/show/'+user.id);
    });


    //     if(err) {
    //        console.log(err);
    //        req.session.flash={
    //          err:err
    //        }
    //        return res.redirect('user/new');
    //        //redirect to sign up page.
    //     }
    //     res.redirect('/user/show/'+user.id);
    //
    //     //create a user  for having all params sent from sign up form.
    // //It is having name,email,title,password,confirm password.
    //
    //     //res.json(user);
    //     req.session.authenticated = true;
    //     req.session.User=user;

    // user.online = true;
    // user.save(function(err,user ){
    //   if(err) return next(err);

    // });

    //req.session.flash = {};
    //redirecting to the show action.

  },

  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },
  // //this function is created for displaying a single user using /user/show/1.
  //
  index : function(req, res, next){

    User.find(function foundUsers(err, users){
      if(err) return next(err);
      res.view({
        users: users
      });
    });
  },
  // //this function is used for returning all the users in form of array.
  //
  edit : function(req, res, next){
    User.findOne(req.param('id'), function foundUser (err, user){
      //find the user by id
      if(err) return next(err);
      if(!user) return next();

      res.view({
        user : user
      });
    });
  },
  //
  update : function(req,res,next){

    User.update(req.param('id'),req.params.all(), function userUpdated(err){
      if(err){
        return res.redirect('/user/edit/'+req.param('id'));
      }

      res.redirect('/user/show/'+req.param('id'));
    });
  },
  //
  destroy: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/user');

    });
  }
};

