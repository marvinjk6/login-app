const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 30},
    email: {type: String, required: true, minlength: 6, maxlength: 30},
    password: {type: String, required: true, minlength: 6, maxlength: 30},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("User", userSchema)