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
  </div>
</template>

<script>
import { detailBlog } from '@/assets/js/api.js'

export default {
  data () {
    return {
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
      ]
    }
  },
  created () {
    this.detailBlog()
  },
  methods: {
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
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        })
        .catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
    },
    link (id) {
      console.log(id)
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
      this.$router.push({name, query: {typeId: id}})
    }
  }
}
</script>

<style scoped lang='less'>
.detail {
  width: 850px;
  margin: 0 auto;
  .medal {
    text-align: left;
    .yuan {
      background-color: rgba(242, 174, 67, 0.25);
      color: #f2ae43;
      border-radius: 24px;
      padding: 2px 8px;
    }
    .label{
        display: inline-block;
        padding: 0 6px;
        color: #017E66;
        background-color: rgba(1,126,102,0.08);
        height: 22px;
        line-height: 22px;
        font-weight: normal;
        font-size: 13px;
        text-align: center;
        margin-left: 10px;
    }
  }
  .tip{
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
}
</style>
