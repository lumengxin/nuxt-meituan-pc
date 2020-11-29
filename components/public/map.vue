<template>
  <div
    class="m-map"
    :id="id"
    :style="{ width: width + 'px', height: height + 'px', margin: '34px 50px' }"
  ></div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default() {
        return [116.46, 39.92]
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: '1464cbc7da37500294f20f6a3f18c216'
    }
  },
  mounted() {
    let self = this
    // 这里需要动态生成id
    self.id = `map${Math.random().toString().slice(4, 6)}`

    // 异步加载高德地图
    window.onMapLoad = function() {
      let map = new window.AMap.Map(self.id, {
        resizeEnabled: true,
        zoom: 11,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolBar = new window.AMap.ToolBar()
        map.addControl(toolBar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url =
      `https://webapi.amap.com/maps?v=1.4.15&key=${self.key}&callback=onMapLoad`
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>

<style lang="scss"></style>
