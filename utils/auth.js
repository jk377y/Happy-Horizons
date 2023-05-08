// verifies that the user is logged in before allowing them to continue
// to the next parameter in the fetch request
const withAuth = (req, res, next) => {
	if (!req.session.user_id) {
		res.redirect('/login');
	} else {
		next();
	}
};

module.exports = withAuth;
