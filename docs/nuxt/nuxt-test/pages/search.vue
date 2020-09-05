<template>
  <div>
    search
    <ul>
      <li v-for="(item, index) in $store.state.city.list" :key=index>
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  // 使用search模板
  layout: 'search',
  data: () => {
    return {
      list: []
    }
  },
  // 检查源代码，没有list数据。服务器端渲染不执行mounted
  // async mounted() {
  //   let self = this
  //   let { status, data: { list }} = await axios.get('/city/list')
  //   if (status === 200) {
  //     self.list = list
  //   }
  // }
  // render之前获取数据
  async asyncData() {
    // 没有this对象
    let { status, data: { list }} = await axios.get('http://localhost:3000/city/list')
    if (status === 200) {
      return {
        list
      }
    }
  }
}
</script>

<style scoped>

</style>
