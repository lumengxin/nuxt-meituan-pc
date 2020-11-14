<template>
  <div class="search-panel">
    <!-- Eemm: el-row>el-col*3 -->
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
          alt="美团"
        />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <!-- dom结构设计保持尽量简洁 -->
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary" @click="input">
            <i class="el-icon-search" />
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt v-for="(item, idx) in hotPlace" :key="idx">
              {{ item.name }}
            </dt>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, idx) in searchList" :key="idx">
              {{ item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggset">
          <a v-for="(item, idx) in hotPlace.slice(0, 3)" :key="idx" href="#">{{ item.name }}&nbsp;&nbsp;</a>
        </p>
        <ul class="nav">
          <li><nuxt-link to="/" class="takeout">美团外买</nuxt-link></li>
          <li><nuxt-link to="/movie" class="takeout">猫眼电影</nuxt-link></li>
          <li><nuxt-link to="/hotel" class="takeout">美团酒店</nuxt-link></li>
          <li>
            <nuxt-link to="/apartment" class="takeout">名宿/公寓</nuxt-link>
          </li>
          <li><nuxt-link to="/takeout" class="takeout">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      search: '',
      isFocus: false,
      // hotPlace: [],
      searchList: []
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search
    },
    isSearchList() {
      return this.isFocus && this.search
    },
    ...mapState({
      hotPlace: state => state.home.hotPlace
    })
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      const self = this
      setTimeout(() => {
        self.isFocus = false
      }, 200)
    },
    input: _.debounce(async function() {
      let self = this
      let city = self.$store.state.geo.position.city.replace('市', '')
      self.searchList = []
      let {
        status,
        data: { top }
      } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      self.searchList = top.slice(0, 10)
    }, 400)
  }
}
</script>

<style lang="scss"></style>
