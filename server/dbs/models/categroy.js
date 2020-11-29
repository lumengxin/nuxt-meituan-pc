import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 注意 categroy集合需要是复数categroys*
const Categroy = new Schema({
  city: {
    type: String,
    require: true
  },
  types: {
    type: Array,
    require: true
  },
  areas:{
    type:Array,
    require:true
  }
})

export default mongoose.model('Categroy', Categroy)
