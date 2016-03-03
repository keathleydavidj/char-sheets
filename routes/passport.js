module.exports = function(app, passport) {

  // HOME PAGE (with login links) ========
  app.get('/', function(req, res) {
    res.render('index'); // load the index.ejs file
  });


  app.get('/dashboard', isLoggedIn, function(req, res, next) {
    res.render('dashboard', {
      'user': req.user
    });
  });

  app.get('/new-camp', isLoggedIn, function(req, res, next) {
    res.render('_camp_form', {
      'user': req.user
    });
  });

  app.get('/new-char', isLoggedIn, function(req, res, next) {
    res.render('_char_form', {
      'user': req.user
    });
  });

  // SIGNIN ==============================
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login', {
      message: req.flash('signupMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  req.session.error = 'Please sign in!';
  res.redirect('/');
}
