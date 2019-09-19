// Here we define our user model in mongoose to create our user collection in our mongo db.
// In this example we just have stored a username and password for our users.
// The 'bcryptjs' npm package provides a method to hash the user password when saved and
// a method to compare a hashed password to an unhashed one.



const mongoose, {Schema} = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, unique: false, required: true }
})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {return bcrypt.compareSync(inputPassword, this.password)},
	hashPassword: plainTextPassword => {return bcrypt.hashSync(plainTextPassword, 10)}
}

// Define hooks for pre-saving
// When a user is created, this hook runs before the new user document is saved.
// If this.password if not falsey (i.e there is a password) we use bcrypt to hash it before saving.
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');	
		this.password = this.hashPassword(this.password)
		next()
	}
})

module.exports = mongoose.model('User', userSchema);

