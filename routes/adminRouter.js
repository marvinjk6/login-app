const express = require("express")
const router = express.Router()
const auth = require("../controllers/authController")

router.get("/", auth, (req, res) => {
    // req.user é o userVerified
    if(req.user.admin)
        res.send("You are ADMIN - just admin can accesss")
    else
        res.status(401).send("Not Admin: access Denied")
})

// rota livre
router.get("/free", auth, (req, res) => {
    res.send("Just who is logged can access")
})



module.exports = router