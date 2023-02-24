

const register = (req, res) => {
    res.send("Register READY")
}

const login = (req, res) => {
    res.send("login READY")
}

module.exports = { register, login }