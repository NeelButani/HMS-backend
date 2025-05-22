const bycrpt = require('bcrypt');
const { User } =  require('../models/user.model');
const jwt = require('jsonwebtoken')

// register API
async function register(req,res) {
  let user = new User({
    username : req.body.username,
    email : req.body.email,
    passwordHash : bycrpt.hashSync(req.body.password,10),
    allowedModules : req.body.allowedModules
  })

  const alreadyUserExists = await User.findOne({
    email : req.body.email
  })

  if(alreadyUserExists){
    return res.status(403).send('User already exicts')
  }

  user = await user.save();

    if(!user){
    return res.status(404).json({
      message : "User is not created"
    })
  }
  return res.status(200).json(user)
}


// login api
async function login(req, res) {

  const user = await User.findOne({
    email: req.body.email
  })

  if (!user) {
    return res.status(401).send('User not found')
  }

  const secret = process.env.secret;

  // if user found and password matches
  if (user && bycrpt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign({
      userId: user.id,
      allowedModules: user.allowedModules
    }, secret, {
      expiresIn: '1d'
    })

    return res.status(200).send({
      user: user.email,
      token: token
    })
    
  } else {
    return res.status(401).send('Password is Wrong')
  }

}

module.exports = {
  register,
  login
}