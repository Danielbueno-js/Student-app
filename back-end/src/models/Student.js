const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const Student = mongoose.model('Student', {
    name: String,
    age: Number,
    course: String,
    school: String,
})

module.exports = Student