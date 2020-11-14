import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Poi = new Schema({
  // 景点名
  name: {
    type: String
  },
  // 省份
  province: {
    type: String
  },
  // 城市
  city: {
    type: String
  },
  // 区县
  county: {
    type: String
  },
  // 区号
  areaCode: {
    type: String
  },
  // 电话
  tel: {
    type: String
  },
  // 地区/商圈
  area: {
    type: String
  },
  // 地址
  addr: {
    type: String
  },
  // 类型
  type: {
    type: String
  },
  // 子类型
  module: {
    type: String
  },
  // 经度
  longitude: {
    type: Number
  },
  // 纬度
  latitude: {
    type: Number
  }
})

export default mongoose.model('Poi', Poi)
