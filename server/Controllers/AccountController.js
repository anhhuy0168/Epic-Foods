const User = require("../models/Users")
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()
class AccountController{
   
    // register
   async userRegister(req,res){
    const { username, password ,email, dateOfBirth, address,phoneNumber} = req.body
    console.log(req.body);
	// Simple validation
	if (!username || !password||!email||!address||!phoneNumber)
		return res
			.status(400)
			.json({ success: false, message: 'Missing information' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ phoneNumber,role :'user', email,address,dateOfBirth,username, password: hashedPassword })
		await newUser.save()

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2h"}
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}
}
module.exports = new AccountController()