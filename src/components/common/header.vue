<template>
<div>
  <el-header class="header">
    <div class="header-inner">
    <span class="logo" @click="toIndex"><span class="c666">Bl</span><span class="green">og</span></span>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">技术</el-menu-item>
      <el-menu-item index="3">生活</el-menu-item>
      <el-menu-item index="4">感想</el-menu-item>
      <el-menu-item index="5">备忘</el-menu-item>
    </el-menu>
    <el-input placeholder="请输入关键字" v-model="keyword" class="search" size="small" @keyup.enter.native="searchKeyword">
      <el-button slot="append" icon="el-icon-search" @click="searchKeyword"></el-button>
    </el-input>
    <div class="header-user">
      <template v-if="!moveToken">
        <el-button type="text" class="login" @click="loginDialog" size="small">立即登录</el-button>
        <el-button type="primary" class="regist" @click="registDialog" size="small">免费注册</el-button>
      </template>
      <el-dropdown @command="handleCommand" v-else>
        <div class="el-dropdown-link">
          <img src="../../assets/img/avatar.png" alt="" :title="userName" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="quit" v-if="moveToken">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    </div>
  </el-header>
  <el-dialog
    title="登录"
    :before-close="closeLogin"
    :visible.sync="loginDialogVisible"
    width="600px">
    <el-form ref="loginForm" :model="loginForm" label-width="110px" size="small">
      <el-form-item label="手机号或Email">
        <el-input v-model="loginForm.account" placeholder="11位手机号或Email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="registDialog">注册新账号</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
    title="注册"
    :before-close="closeRegist"
    :visible.sync="registDialogVisible"
    width="600px">
    <el-form ref="registForm" :model="registForm" label-width="110px" size="small">
      <el-form-item label="你的名字">
        <el-input v-model="registForm.name" placeholder="真实姓名或常用昵称"></el-input>
      </el-form-item>
      <el-form-item label="手机号或Email">
        <el-input v-model="registForm.account" placeholder="11位手机号或Email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="registForm.password" placeholder="不少于6位的密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="regist">注册</el-button>
        <el-button @click="loginDialog">已有账号登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import { registC, loginC, getUserInfoC, logoutC } from '@/assets/js/api.js'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'loginDialogVisible',
      'registDialogVisible',
      'userName'
    ])
  },
  data () {
    return {
      activeIndex: '1',
      keyword: '',
      loginForm: {
        account: '',
        password: ''
      },
      registForm: {
        name: '',
        account: '',
        password: ''
      },
      moveToken: ''
    }
  },
  created () {
    this.moveToken = sessionStorage.getItem('token')
  },
  methods: {
    ...mapMutations([
      'setLoginDialog',
      'setRegistDialog',
      'setUserName',
      'setAccount'
    ]),
    async handleCommand (command) {
      if (command === 'quit') {
        await logoutC().then(res => {
          if (res.status === 1) {
            this.$notify({ title: res.msg, type: 'success', duration: 1000 })
            sessionStorage.clear()
            this.moveToken = ''
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        }).catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
      }
    },
    async getUserInfoC () {
      await getUserInfoC().then(res => {
        let data = res.data
        if (res.status === 1) {
          sessionStorage.setItem('userStatus', data.userStatus)
          this.moveToken = sessionStorage.getItem('token')
          this.setUserName(data.userName)
          this.setAccount(data.account)
        } else {
          this.$notify({ title: res.msg, type: 'error', duration: 1000 })
        }
      }).catch(res => {
        this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
      })
    },
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
    },
    toIndex () {
      this.$router.push({name: 'index'})
    },
    searchKeyword () {
      let { keyword } = this
      this.$router.push({name: 'search', query: {keyword}})
    },
    closeLogin () {
      this.setLoginDialog(false)
    },
    closeRegist () {
      this.setRegistDialog(false)
    },
    loginDialog () {
      this.setRegistDialog(false)
      this.setLoginDialog(true)
    },
    registDialog () {
      this.setLoginDialog(false)
      this.setRegistDialog(true)
    },
    regist () {
      let { name, account, password } = this.registForm
      let params = {
        name,
        account,
        password
      }
      registC(params).then(res => {
        if (res.status === 1) {
          this.setLoginDialog(false)
          this.$notify({ title: res.msg, type: 'success', duration: 1000 })
        } else {
          this.$notify({ title: res.msg, type: 'error', duration: 1000 })
        }
      }).catch(res => {
        this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
      })
    },
    login () {
      let { account, password } = this.loginForm
      let params = {
        account,
        password
      }
      loginC(params).then(res => {
        if (res.status === 1) {
          sessionStorage.setItem('token', res.token)

          this.$notify({ title: res.msg, type: 'success', duration: 1000 })
          this.setLoginDialog(false)
          this.getUserInfoC()
        } else {
          this.$notify({ title: res.msg, type: 'error', duration: 1000 })
        }
      }).catch(res => {
        this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
      })
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
  .header-user{
    position: absolute;
    right: 0;
    top: 12px;
    .login{
      color: #009a61;
      font-size: 14px;
      margin-right: 10px;
      padding: 9px 15px;
      margin-right: 0;
      &:hover,&:active{
        background-color: #F3F3F3;
      }
    }
    .regist{
      font-size: 14px;
      background-color: #009a61
    }
  }
  .search{
    width: 240px;
    position: absolute;
    top: 12px;
    right: 283px;
  }
  .header-inner{
    position: relative;
    width: 1140px;
    margin: 0 auto;
    .logo{
      cursor: pointer;
      position: absolute;
      z-index: 10;
      font-size: 28px;
      top: 11px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .el-menu-demo{
      padding-left: 100px;
      border: none;
      background-color: transparent;
      .el-menu-item.is-active {
        border-bottom: 2px solid #009a61;
        color: #009a61;
        font-weight: 600;
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
  img{
    cursor: pointer;
    border-radius: 34px;
    width: 34px;
    height: 34px;
    margin-left: 10px;
  }
}
</style>
