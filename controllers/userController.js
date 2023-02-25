const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

    // verificando se o email existe no banco de dados
    const selectedUser = await User.findOne({ email: req.body.email })
    if (!selectedUser) return res.status(400).send("Email or Password incorrect")

    // verificando a senha passada com o hash do banco de dados
    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
    if(!passwordAndUserMatch) return res.status(400).send("Email or Password incorrect")

    // criando o token, foi adicionado admin para proteger a rota, dando acesso apenas quando admin for true
    const token = jwt.sign({ _id: selectedUser.id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)

    res.header("authorization-token", token)

    res.send("user Logged")

}

module.exports = { register, login }