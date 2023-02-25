const User = require("../models/User")
const bcrypt = require("bcryptjs")

const register = async (req, res) => {

    // verificando se já existe o email enviado
    const selectedUser = await User.findOne({ email: req.body.email })
    if (selectedUser) return res.status(400).send("email already exists")
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(error) {
        res.status(404).send(error)
    }
}

const login = async (req, res) => {
    res.send("login READY")
}

module.exports = { register, login }