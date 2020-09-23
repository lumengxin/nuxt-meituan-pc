<template>
  <div class="search-panel">
    <!-- Eemm: el-row>el-col*3 -->
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" alt="美团" />
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
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt v-for="(item, idx) in hotPlace" :key="idx">
              {{ item }}
            </dt>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, idx) in searchList" :key="idx">
              {{ item }}
            </dd>
          </dl>
        </div>
        <p class="suggset">
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
        </p>
        <ul class="nav">
          <li><nuxt-link to="/" class="takeout">美团外买</nuxt-link></li>
          <li><nuxt-link to="/movie" class="takeout">猫眼电影</nuxt-link></li>
          <li><nuxt-link to="/hotel" class="takeout">美团酒店</nuxt-link></li>
          <li><nuxt-link to="/apartment" class="takeout">名宿/公寓</nuxt-link></li>
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
export default {
  data: () => {
    return {
      search: '',
      isFocus: false,
      hotPlace: ['火锅', '火锅', '火锅'],
      searchList: ['故宫', '故宫', '故宫']
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search
    },
    isSearchList() {
      return this.isFocus && this.search
    }
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
    input() {
      // console.log('aaa')
    }
  }
}
</script>

<style lang="scss"></style>
