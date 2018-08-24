<template>
  <div class="home">
    <el-container>
      <blog-header />
      <el-main>
        <router-view></router-view>
      </el-main>
      <blog-footer />
    </el-container>
  </div>
</template>

<script>
import blogHeader from '@/components/common/header'
import blogFooter from '@/components/common/footer'

export default {
  components: { blogHeader, blogFooter },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped lang='less'>
.home{
  position: relative;
  min-height: 100%;
  .el-main {
    min-height: 600px;
    color: #333;
    text-align: center;
    width: 1140px;
    margin: 0 auto;
    margin-top: 28px;
    padding: 0;
  }

  .el-container {
    flex-direction: column;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
