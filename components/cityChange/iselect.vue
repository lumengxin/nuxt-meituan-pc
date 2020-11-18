<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pValue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="cValue" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="!city.length"
      />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      province: [],
      pValue: '',
      city: [],
      cValue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pValue(newValue) {
      let {
        status,
        data: { city }
      } = await this.$axios.get(`/geo/province/${newValue}`)
      if (status === 200) {
        this.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cValue = ''
      }
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      let self = this
      if (self.cities.length) {
        cb(self.cities.filter((item) => item.value.includes(query)))
      } else {
        let {
          status,
          data: { city }
        } = await self.$axios.get('/geo/city')
        if (status === 200) {
          self.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          cb(self.cities.filter((item) => item.value.includes(query)))
        } else {
          self.cities = []
          cb(self.cities)
        }
      }
    }, 200),
    handleSelect(e) {
      console.log('handleSelect -> e', e)
      // this.$store.commit('geo/setPosition', e.value)
      // window.location.href = '/'
    }
  },
  async mounted() {
    let {
      status,
      data: { province }
    } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/changeCity/iselect.scss';
</style>
