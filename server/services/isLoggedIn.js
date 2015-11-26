module.exports = function(req, res, next) {
  console.log('@@@@@@@@@@@@@@@ REQ in isLoggedIn', req);
	if (req.isAuthenticated()) {
		console.log(req.user.id, "Logged in!");
		return next();
	} else {
		console.log("Not logged in");
		res.redirect('/');
	}
};
