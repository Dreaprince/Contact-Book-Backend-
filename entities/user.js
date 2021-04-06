// import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'mongoose-bcrypt';
// import timestamps from 'mongoose-timestamp';
// import mongooseStringQuery from 'mongoose-string-query';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		username: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true,
			bcrypt: true
		},
		name: {
			type: String,
			trim: true,
			required: true
		}
	})
	// userSchema.pre("save", async function (next) {
	// 	if (!this.isModified("password")) {
	// 	  return next();
	// 	}
	// 	const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
	// 	this.password = hash;
	// 	next();
	// });	


// UserSchema.plugin(bcrypt);
// UserSchema.plugin(timestamps);
// UserSchema.plugin(mongooseStringQuery);

// UserSchema.index({ email: 1, username: 1 });

module.exports = exports = mongoose.model('User', UserSchema);