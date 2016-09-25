/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  'new': function (req, res) {
    res.view('session/new');
  },

  create: function (req, res, next) {
    if (!req.param('email') || !req.param('password')) {
      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        message: 'You must enter both a username and password.'
      }];

      req.session.flash = {
        err: usernamePasswordRequiredError
      };

      res.redirect('/session/new');
      return;
    }
    User.findOneByEmail(req.param('email'), function foundUser(err, user) {
      if (err) return next(err);

      // If no user is found...
      if (!user) {
        var noAccountError = [{
          name: 'noAccount',
          message: 'The email address ' + req.param('email') + ' not found.'
        }];
        req.session.flash = {
          err: noAccountError
        };
        res.redirect('/session/new');
        return;
      }
      req.session.authenticated = true;
      req.session.User = user;

      if(req.session.User.admin){
        res.redirect('/user');
        return;
      }
      res.redirect('/user/show/' + user.id);


      // var salt = bcrypt.genSaltSync(saltRounds);
      // var hash = bcrypt.hashSync(user.encryptedPassword, salt);
      // bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
      //   res.redirect('session/new');
      // bcrypt.compareSync(req.param('password'), hash);
      //   res.redirect('/user/show/' + user.id);

      // bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
      //   if (err) return next(err);
      //
      //   // If the password from the form doesn't match the password from the database...
      //   if (!valid) {
      //     var usernamePasswordMismatchError = [{
      //       name: 'usernamePasswordMismatch',
      //       message: 'Invalid username and password combination.Check Sessioncontroller.js'
      //     }];
      //     req.session.flash = {
      //       err: usernamePasswordMismatchError
      //     };
      //     res.redirect('/session/new');
      //     return;
      //   }
      //
      //   // Log user in
      //   req.session.authenticated = true;
      //   req.session.User = user;
      //
      //
      //   res.redirect('/user/show/' + user.id);
      // });
    });
  },

  destroy: function(req, res, next) {

    User.findOne(req.session.User.id, function foundUser(err, user) {

      var userId = req.session.User.id;

      if (user) {
        // The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
        User.update(userId, {
          online: false
        }, function(err) {
          if (err) return next(err);



          // Wipe out the session (log out)
          req.session.destroy();

          // Redirect the browser to the sign-in screen
          res.redirect('/session/new');
        });
      } else {

        // Wipe out the session (log out)
        req.session.destroy();

        // Redirect the browser to the sign-in screen
        res.redirect('/session/new');
      }
    });
  }
};

