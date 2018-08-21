<template>
  <div class="login">
    <h2 class="system-name">活活管理系统</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.native.enter="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.enter="submitForm('ruleForm')" class="loginBtn" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { avatarMenu, getToken } from '@/assets/js/api.js'

export default {
  name: 'login',
  data () {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let {username, password} = this.ruleForm
      let params = `${getToken}?username=${username}&password=${password}&system=sale`
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true
          // post特殊格式
          this.$ajax.post(params).then(res => {
            let data = res.data
            if (res.status === 200 && res.data.errNum === 0) {
              let token = data.access_token
              let user = data.user_info
              sessionStorage.setItem('user', JSON.stringify(user))
              sessionStorage.setItem('token', token)
              sessionStorage.setItem('user', JSON.stringify(user)) // 获取用户信息
              avatarMenu({systemName: 'avatar'}).then(res => {
                let menuBack = ['busiList', 'orderList', 'costList', 'allotLog', 'statement', 'firstBarList']
                let menuFront = ['busiHallFront', 'orderListFront']
                let menuAll = ['busiList', 'orderList', 'costList', 'allotLog', 'statement', 'firstBarList', 'busiHallFront', 'orderListFront']
                if ((Array.isArray(res.data) && res.data.length === 0) || (!res.data && typeof (res.data) !== 'undefined' && res.data !== 0)) {
                  this.$notify({title: '没有权限', type: 'error', duration: 1000})
                  this.isLoading = false
                } else {
                  this.isLoading = false
                  if (res.data.includes('AvatarBackstage') && res.data.length === 1) {
                    console.log('后台')
                    this.$notify({title: '登录成功', type: 'success', duration: 1000})
                    sessionStorage.setItem('menu', JSON.stringify(menuBack))
                    this.$router.push({name: menuBack[0]})
                  } else if (res.data.includes('AvatarFront') && res.data.length === 1) {
                    console.log('前台')
                    this.$notify({title: '登录成功', type: 'success', duration: 1000})
                    sessionStorage.setItem('menu', JSON.stringify(menuFront))
                    this.$router.push({name: menuFront[0]})
                  } else if (JSON.stringify(res.data.sort()) === JSON.stringify(['AvatarBackstage', 'AvatarFront'])) {
                    console.log('所有权限')
                    this.$notify({title: '登录成功', type: 'success', duration: 1000})
                    sessionStorage.setItem('menu', JSON.stringify(menuAll))
                    this.$router.push({name: menuBack[0]})
                  }
                }
                let initIndex = sessionStorage.getItem('menuIndex')
                if (!initIndex) {
                  sessionStorage.setItem('menuIndex', JSON.stringify({menuIndex1: 0})) // 菜单第一项默认激活
                }
              })
            } else {
              this.isLoading = false
              this.$notify({title: res.data.errMsg, type: 'error', duration: 1000})
            }
          }).catch(res => {
            this.isLoading = false
            this.$notify({title: '登录失败', type: 'error', duration: 1000})
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login{
  background-color: #eff2f7;
  height: 100%;
  form{
    width: 350px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .system-name{
    padding-left: 40px;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 0;
    padding-top: 150px;
  }
  .loginBtn{
    width: 100%;
    margin-top: 10px;
  }
}
</style>
