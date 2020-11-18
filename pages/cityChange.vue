<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><hot /></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><categroy /></el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/cityChange/iselect'
import hot from '@/components/cityChange/hot'
import categroy from '@/components/cityChange/categroy'

export default {
  components: {
    iSelect,
    hot,
    categroy
  }
}
</script>

<style lang="scss"></style>
