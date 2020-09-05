const mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

// 生成的文档名，默认为models下的文件名
module.exports = mongoose.model('Person', personSchema)