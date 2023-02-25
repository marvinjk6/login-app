const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const token = req.header("authorization-token")
    if(!token) return res.status(401).send("Access Denied")

    // validar o token
    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        next()
    } catch(error) {
        res.status(401).send("Access Denied")
    }
        
}