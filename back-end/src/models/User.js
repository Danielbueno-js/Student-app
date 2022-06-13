const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const User = mongoose.model('User', {
    name: String,
    password: String,
})

module.exports = User