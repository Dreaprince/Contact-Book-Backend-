const router = require("express").Router();
const {check} = require('express-validator');


const { 
	user_login,
	user_signup,
	resetPasswordRequestController,
	resetPasswordController
} = require('../controllers/auth');


//@router   POST api/auth
//@desc     Auth user & get token 
//@access   Public
router.post("/login",
[
	check('email', 'Please include a valid email').isEmail(),
	// check('username', 'Please add username').not().isEmpty(),
	check('password', 'piease enter a password with 6 or more character or more character')
	.isLength({min: 6})
],user_login );


//@router   POST api/auth
//@desc     Register a user
//@access   Public
router.post('/signup',
[
	check('email', 'Please include a valid email').isEmail(),
	check('username', 'Please add username').not().isEmpty(),
	check('password', 'piease enter a password with 6 or more character or more character')
	.isLength({min: 6}),
	check('name', 'Please add name').not().isEmpty()
],user_signup);

//@router   POST api/auth
//@desc     Reset password
//@access   Private
router.post("/login/requestResetPassword",resetPasswordRequestController );
router.post("/login/resetPassword",resetPasswordController);


module.exports = router;






	




















//  import Auth from '../controllers/auth';

// module.exports = app => {
// 	app.route('/auth/login').post(Auth.login);
// 	app.route('/auth/signup').post(Auth.signup);

// 	/*** BONUS POINTS ***/
// 	app.route('/auth/forgotPassword').post(Auth.forgotPassword);
// };