const adminAuth = (req, res, next) => {
    req.session.loggedIn
    	? req.session.user.isAdmin
    		? next()
    		: res.redirect("/unauthorized")
    	: res.redirect("/notLoggedIn");
};

module.exports = { adminAuth };