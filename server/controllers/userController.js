const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')

const generateJwtToken = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Bad password or email'))
        }
        const someUser = await User.findOne({where: {email}})
        if (someUser) {
            return next(ApiError.badRequest('User with this e-mail exists'))
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwtToken(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res,next) {
        const {email,password}=req.body
        const user=await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internalServer('User Not Found'))
        }
        let comparePassword=bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internalServer('Incorrect password'))
        }
        const token=generateJwtToken(user.id,user.email,user.role)
        return res.json({token})
    }

    async check(req, res, next) {
       const token=generateJwtToken(req.user.id,req.user.email,req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()