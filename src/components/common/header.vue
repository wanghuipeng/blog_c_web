<template>
   <el-header class="header">
     <div class="header-inner">
      <span class="logo"><span class="c666">Bl</span><span class="green">og</span></span>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">技术</el-menu-item>
        <el-menu-item index="3">生活</el-menu-item>
        <el-menu-item index="4">感想</el-menu-item>
        <el-menu-item index="5">备忘</el-menu-item>
      </el-menu>
     </div>
   </el-header>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  mounted () {},
  methods: {
    handleSelect (e) {
      switch (e) {
        case '1':
          this.linkTo('index')
          break
        case '2':
          this.linkTo('technology', 'type_1')
          break
        case '3':
          this.linkTo('life', 'type_2')
          break
        case '4':
          this.linkTo('thoughts', 'type_3')
          break
        case '5':
          this.linkTo('memo', 'type_4')
          break
      }
    },
    linkTo (route, param) {
      this.$router.push({name: route, query: {typeId: param}})
    }
  }
}
</script>

<style scoped lang='less'>
.header {
  padding: 0;
  width: 100%;
  border-top: 3px solid #009a61;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1), 0 1px rgba(0, 0, 0, 0.1);
  background: #fafafa;
  .header-inner{
    position: relative;
    width: 1140px;
    margin: 0 auto;
    .logo{
      position: absolute;
      z-index: 10;
      font-size: 24px;
      top: 16px;
    }
    .el-menu-demo{
      padding-left: 100px;
      border: none;
      background-color: transparent;
      .el-menu-item.is-active {
        border-bottom: 2px solid #009a61;
        color: #009a61;
      }
      .el-menu-item{
        font-size: 16px;
        &:hover{
          background-color: transparent;
          color: #009a61;
        }
      }
    }
  }
}
</style>
