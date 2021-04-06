const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');


const {
	requestPasswordReset,
	resetPassword,
} = require("../middleware/service");



const User = require('../entities/user');



const user_login = async (req, res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}

	const {email,password} = req.body;  
	try {
		let user = await User.findOne({email});

		if(!user) {
		   return res.status(400).json({msg: "Invalid credentials"});
		}
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({msg: 'Request Password reset'})
		}

		const payload = {
			user: {
				id: user.id
			}
		}
		jwt.sign(payload, config.get('jwtSecret'), {
			expiresIn: 360000,
		},(err, token) => {
			if (err) throw err;
			res.json({token});
		});

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error')
	}
}



const user_signup = async (req, res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}

	const {email,username,password,name} = req.body;
	try {
		let user = await User.findOne({email});

		if(user) {
		   return res.status(400).json({msg: "User already exist"});
		}
		user = new User({
			 email,
			 username,
			 password,
			 name
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		}
		jwt.sign(payload, config.get('jwtSecret'), {
			expiresIn: 360000,
		},(err, token) => {
			if (err) throw err;
			res.json({token});
		});

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error')
	}
}


const resetPasswordRequestController = async (req, res, next) => {
	const requestPasswordResetService = await requestPasswordReset(
	  req.body.email
	);
	return res.json(requestPasswordResetService);
  };
  
  const resetPasswordController = async (req, res, next) => {
	const resetPasswordService = await resetPassword(
	  req.body.userId,
	  req.body.token,
	  req.body.password
	);
	return res.json(resetPasswordService);
  };
  
  module.exports = {
    user_login,
	user_signup,
	resetPasswordRequestController,
	resetPasswordController
  };