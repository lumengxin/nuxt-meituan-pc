<template>
  <div class="m-geo">
    <!-- ssr服务器端渲染好了，非接口请求获取数据 -->
    <i class="el-icon-location">{{ $store.state.geo.position.city }}</i>
    <nuxt-link class="changeCity" to="/cityChange">
      切换城市
    </nuxt-link>
    <!-- [祥和 廊坊 天津] -->
  </div>
</template>

<script>
export default {}
</script>
