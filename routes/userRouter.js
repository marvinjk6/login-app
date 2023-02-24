const express = require("express")
const router = express.Router()

router.post("/register", (req, res) => {
    res.send("Ready to register")
})
router.post("/login", (req, res) => {
    res.send("Ready to login")
})

module.exports = router;