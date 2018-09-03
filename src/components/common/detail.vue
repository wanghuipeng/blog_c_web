<template>
  <div class="detail">
       <div class="head">
            <div class="left">
                <img :src="avatar">
            </div>
            <div class="right">
                <p class="author"><span class="green">{{detail.author}}</span><span class="middile-text">发表于</span><span class="green pointer" v-for="(item,index) in types" :key="index" v-if="detail.type === item.value" @click="link(item.value)">{{item.label}}</span>专栏</p>
                <p class="tip">{{detail.updateTime ? detail.updateTime : detail.createTime }}<span class="circle"></span>{{detail.pv}}次阅读</p>
            </div>
       </div>
       <div class="title">{{detail.title}}</div>
       <div class="medal">
          <span class="yuan">原</span><span class="label pointer" v-for="(item,index) in types" :key="index" v-if="detail.type === item.value" @click="link(item.value)">{{item.label}}</span>
       </div>
       <div class="cont">{{detail.content}}</div>
       <div class="praise-collect">
         <p class="praise" @click="praiseClick">
           <span v-if="praiseNum > 0 && praiseStatus">已赞</span>
           <span v-else>赞</span>
           <span>{{praiseNum}}</span>
         </p>
         <p class="collect" @click="collectClick">
           <span v-if="collectNum > 0 && collectStatus">已收藏</span>
           <span v-else>收藏</span>
           <span>{{collectNum}}</span>
         </p>
       </div>
       <div class="remak">
         <p class="remark-title">{{count}} 条评论</p>
         <ul class="remark-list" v-if="remarkList.length > 0">
           <li v-for="(item,index) in remarkList" :key="index" class="item">
             <img src="../../assets/img/avatar.png" alt="">
             <div class="remarkCont">
               <p class="top"><strong class="green">{{item.name}}</strong><span class="time">{{item.time | formatDate}}</span></p>
               <p class="mid">{{item.markContent}}</p>
               <p class="foot">
                 <span @click="praiseRemark(item._id)"><i :class="item.premarkStatus ? 'fa fa-thumbs-up active' : 'fa fa-thumbs-up'"></i>赞</span>
                 <span>回复</span>
               </p>
             </div>
           </li>
         </ul>
         <div class="write">
           <img src="../../assets/img/avatar.png" />
           <div class="textarea">
              <textarea placeholder="文明社会，理性评论" v-model="remarkText" rows="6" />
              <el-button type="primary" @click="remarkBtn" size="small">发布评论</el-button>
           </div>
         </div>
       </div>
  </div>
</template>

<script>
import { detailBlog, addMark, getUserInfoC, praiseBlog, collectBlog, premark } from '@/assets/js/api.js'
import { mapState, mapMutations } from 'vuex'
import { formatDate } from '@/assets/js/common.js'

export default {
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  computed: {
    ...mapState(['userName', 'account'])
  },
  data () {
    return {
      userStatus: null,
      avatar: '',
      detail: {},
      types: [
        {
          label: '技术',
          value: 'type_1'
        },
        {
          label: '生活',
          value: 'type_2'
        },
        {
          label: '感想',
          value: 'type_3'
        },
        {
          label: '备忘',
          value: 'type_4'
        }
      ],
      remarkText: '',
      count: 0,
      remarkList: [],
      praiseNum: null,
      collectNum: null,
      praiseStatus: 0,
      collectStatus: 0,
      praiseId: '',
      collectId: '',
      premarkStatus: 0
    }
  },
  created () {
    this.detailBlog()
    let userStatus = sessionStorage.getItem('userStatus')
    if (userStatus === '1') {
      this.getUserInfoC()
    }
  },
  methods: {
    ...mapMutations([
      'setLoginDialog',
      'setRegistDialog',
      'setUserName',
      'setAccount'
    ]),
    praiseRemark (remarkId) {
      let { premarkStatus } = this
      let params = {
        remarkId,
        premarkStatus
      }
      premark(params).then(res => {
        let data = res.data
        if (res.status === 1) {
          this.premarkStatus = data.premarkStatus
          this.$notify({ title: res.msg, type: 'success', duration: 1000 })
        } else {
          this.$notify({ title: res.msg, type: 'error', duration: 1000 })
        }
      }).catch(res => {
        this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
      })
    },
    praiseClick () {
      let userStatus = sessionStorage.getItem('userStatus')
      if (userStatus === '1') {
        let { userName, praiseStatus, praiseId } = this
        let params = {
          blogId: this.$route.query.blogId,
          userName,
          praiseStatus,
          praiseId
        }
        praiseBlog(params).then(res => {
          if (res.status === 1) {
            this.$notify({ title: res.msg, type: 'success', duration: 1000 })
            this.detailBlog()
            this.praiseStatus = 0
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        }).catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
      } else {
        this.setLoginDialog(true)
      }
    },
    collectClick () {
      let userStatus = sessionStorage.getItem('userStatus')
      if (userStatus === '1') {
        let { userName, collectStatus, collectId } = this
        let params = {
          blogId: this.$route.query.blogId,
          userName,
          collectStatus,
          collectId
        }
        collectBlog(params).then(res => {
          if (res.status === 1) {
            this.$notify({ title: res.msg, type: 'success', duration: 1000 })
            this.detailBlog()
            this.collectStatus = 0
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        }).catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
      } else {
        this.setLoginDialog(true)
      }
    },
    getUserInfoC () {
      getUserInfoC()
        .then(res => {
          let data = res.data
          if (res.status === 1) {
            sessionStorage.setItem('userStatus', data.userStatus)
            this.moveToken = sessionStorage.getItem('token')
            this.setUserName(data.userName)
            this.setAccount(data.account)
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        })
        .catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
    },
    detailBlog () {
      let params = {
        id: this.$route.query.blogId
      }
      detailBlog(params)
        .then(res => {
          let data = res.data
          if (res.status === 1) {
            this.detail = data
            this.avatar = data.avatar
            this.remarkList = data.remarkList
            this.count = data.remarkList.length
            this.praiseNum = data.praiseList.length
            this.collectNum = data.collectList.length
            let praiseNowList = data.praiseList.filter(item => {
              return item.userName === this.userName
            })
            if (praiseNowList.length > 0) {
              this.praiseId = praiseNowList[0]._id
              this.praiseStatus = 1
            }
            let collectNowList = data.collectList.filter(item => {
              return item.userName === this.userName
            })
            if (collectNowList.length > 0) {
              this.collectId = collectNowList[0]._id
              this.collectStatus = 1
            }
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        })
        .catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
    },
    link (id) {
      switch (id) {
        case 'type_1':
          this.linkTo('technology', 'type_1')
          break
        case 'type_2':
          this.linkTo('life', 'type_2')
          break
        case 'type_3':
          this.linkTo('thoughts', 'type_3')
          break
        case 'type_4':
          this.linkTo('memo', 'type_4')
          break
      }
    },
    linkTo (name, id) {
      this.$router.push({ name, query: { typeId: id } })
    },
    remarkBtn () {
      let userStatus = sessionStorage.getItem('userStatus')
      if (userStatus === '1') {
        let id = this.$route.query.blogId
        let { userName, account, remarkText: markContent } = this
        let params = {
          id,
          userName,
          account,
          markContent
        }
        addMark(params)
          .then(res => {
            if (res.status === 1) {
              this.$notify({ title: res.msg, type: 'success', duration: 1000 })
              this.detailBlog()
              this.remarkText = ''
            } else {
              this.$notify({ title: res.msg, type: 'error', duration: 1000 })
            }
          })
          .catch(res => {
            this.$notify({
              title: '服务器异常',
              type: 'error',
              duration: 1000
            })
          })
      } else {
        this.setLoginDialog(true)
      }
    }
  },
  watch: {
    userName (curVal, oldVal) {
      if (curVal !== oldVal) {
        this.detailBlog()
      }
    }
  }
}
</script>

<style scoped lang='less'>
.detail {
  width: 850px;
  margin: 0 auto;
  .praise-collect{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
    align-items: center;
    width: 440px;
    margin: 0 auto;
    p{
      cursor: pointer;
      min-width: 100px;
      margin: 10px;
      padding: 8px 15px;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: inset 0 3px 5px rgba(0,0,0,0.125);
      font-size: 18px;
      &.praise{
        color: #fff;
        background-color: #449d44;
        border-color: #398439;
        span{
          padding: 0 5px;
        }
        span:last-child{
          border-left: 1px solid rgba(255,255,255,0.2);
          padding-left: 10px;
          padding-right: 0;
        }
      }
      &.collect{
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
        span{
          padding: 0 5px;
        }
        span:last-child{
          border-left: 1px solid rgba(0,0,0,0.1);
          padding-left: 10px;
          padding-right: 0;
        }
      }
    }
  }
  .remark-list {
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    padding: 15px 0;
    .item {
      margin-top: 15px;
      display: flex;
      border-top: 1px solid rgba(0,0,0,0.09);
      padding: 15px 0 0 0;
      &:first-child{
        margin-top: 0;
        padding-top: 0;
        border-top: none;
      }
      img {
        width: 32px;
        height: 32px;
        border-radius: 32px;
      }
      .remarkCont {
        padding-left: 20px;
        width: 100%;
        text-align: left;
        .mid{
          margin-top: 10px;
        }
        .foot{
          margin-top: 10px;
          span{
            color: #999;
            font-size: 13px;
            cursor: pointer;
            i{
              margin-right: 5px;
              &.active{
                color: #449d44;
              }
            }
            margin-right: 15px;
            &:first-child:hover{
              color: #009a61;
            }
          }
        }
      }
      .time{
        margin-left: 10px;
        color: #999;
        font-size: 13px;
      }
    }
  }
  .medal {
    text-align: left;
    .yuan {
      background-color: rgba(242, 174, 67, 0.25);
      color: #f2ae43;
      border-radius: 24px;
      padding: 2px 8px;
    }
    .label {
      display: inline-block;
      padding: 0 6px;
      color: #017e66;
      background-color: rgba(1, 126, 102, 0.08);
      height: 22px;
      line-height: 22px;
      font-weight: normal;
      font-size: 13px;
      text-align: center;
      margin-left: 10px;
    }
  }
  .tip {
    color: #999;
    margin-top: 5px;
  }
  .middile-text {
    margin: 0 5px;
    color: #999;
  }
  .head {
    display: flex;
    .left {
      width: auto;
      img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
      }
    }
    .right {
      text-align: left;
      padding-left: 15px;
    }
  }
  .title {
    font-size: 34px;
    text-align: left;
    margin: 20px auto;
  }
  .cont {
    font-size: 15px;
    color: #333;
    text-align: left;
    line-height: 28px;
    margin: 40px auto;
    word-wrap: break-word;
  }
  .remak {
    .remark-title {
      text-align: left;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .write {
      display: flex;
      padding: 15px;
      border-top: 1px solid rgba(0, 0, 0, 0.09);
      background: #fafafa;
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.09);
      border-radius: 2px 2px 0px 0px;
      img {
        width: 32px;
        height: 32px;
        border-radius: 32px;
      }
      .textarea {
        padding-left: 20px;
        text-align: right;
        width: 100%;
        button {
          margin-top: 10px;
        }
        textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 10px;
        }
      }
    }
  }
}
</style>
