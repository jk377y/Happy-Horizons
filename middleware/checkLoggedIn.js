const checkLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
      res.locals.loggedIn = true;
      res.locals.firstName = req.session.user.firstName;
      res.locals.isAdmin = req.session.user.isAdmin;
    }
    next();
  }
  
  module.exports = { checkLoggedIn };