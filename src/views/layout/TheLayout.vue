<template>
  <el-row class="page">
    <el-col :span="24" style="position: absolute;">
      <the-header :open-nav="openNav" @toggle-open="toggleOpen"></the-header>
    </el-col>
    <el-col :span="24" class="page-main">
      <the-sidebar :open-nav="openNav"></the-sidebar>
      <section class="page-content" :class="{'page-content-hide-aside' : !openNav}">
        <the-main></the-main>
        <the-footer></the-footer>
      </section>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 整体框架
 */
import TheLayoutHeader from './TheLayoutHeader'
import TheLayoutSidebar from './TheLayoutSidebar'
import TheLayoutFooter from './TheLayoutFooter'
import TheLayoutMain from './TheLayoutMain'
export default {
  name: 'TheLayout',
  data() {
    return {
      openNav: true
    }
  },
  methods: {
    toggleOpen() {
      this.openNav = !this.openNav
    }
  },
  components: {
    'the-header': TheLayoutHeader,
    'the-sidebar': TheLayoutSidebar,
    'the-footer': TheLayoutFooter,
    'the-main': TheLayoutMain,
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  .page-main {
    box-sizing: border-box;
    padding-top: 60px;
    height: 100%;

    .page-content {
      overflow: auto;
      margin-left: 240px;
      height: 100%;
      background-color: #ebeef5;
    }
    .page-content-hide-aside {
      margin-left: 65px;
    }
  }
}
</style>