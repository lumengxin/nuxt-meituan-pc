<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseLeave">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in menu" :key="idx" @mouseenter="mouseEnter">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="sEnter" @mouseleave="sLeave">
      <!-- 模块循环 -->
      <template v-for="(item, idx) in curDetails.child">
        <h4 :key="idx" style="color: red">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      kind: '',
      // menu: [
      //   {
      //     type: 'food',
      //     name: '美食',
      //     child: [
      //       {
      //         title: '美食',
      //         child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
      //       }
      //     ]
      //   },
      //   {
      //     type: 'takeout',
      //     name: '外卖',
      //     child: [
      //       {
      //         title: '外卖',
      //         child: ['美团外卖']
      //       }
      //     ]
      //   },
      //   {
      //     type: 'hotel',
      //     name: '酒店',
      //     child: [
      //       {
      //         title: '酒店星级',
      //         child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
      //       }
      //     ]
      //   }
      // ]
    }
  },
  computed: {
    menu() {
      return this.$store.state.home.menu
    },
    curDetails() {
      return this.menu.filter((item) => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseLeave() {
      const self = this
      self._timer = setTimeout(() => {
        self.kind = ''
      }, 150)
    },
    mouseEnter(e) {
      this.kind = e.target.querySelector('i').className
    },
    sEnter() {
      clearTimeout(this._timer)
    },
    sLeave() {
      this.kind = ''
    }
  }
}
</script>

<style lang="scss"></style>
