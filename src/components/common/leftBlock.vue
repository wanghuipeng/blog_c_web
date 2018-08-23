<template>
  <div class="left">
      <ul class="menu">
        <li class="title">技术频道</li>
        <li v-for="(item,index) in menus" :key="index" @click="linkTo(item.link)" :class="item.link === linkName ? 'active' : ''"><img :src="item.icon" />{{item.name}}</li>
      </ul>
    </div>
</template>

<script>
export default {
  props: [ 'linkName' ],
  data () {
    return {
      menus: [
        {
          name: '前端',
          link: 'frontEnd',
          icon: 'https://avatar-static.segmentfault.com/399/739/3997397795-5a6edc1c3167f_small'
        },
        {
          name: '后端',
          link: 'backEnd',
          icon: 'https://avatar-static.segmentfault.com/199/890/1998904068-5a6edc3e40de1_small'
        },
        {
          name: '区块链',
          link: 'chain',
          icon: 'https://avatar-static.segmentfault.com/950/262/950262627-5a7048175cdc9_small'
        }
      ]
    }
  },
  methods: {
    linkTo (link) {
      this.$router.push({name: link})
    }
  }
}
</script>

<style scoped lang='less'>
.menu{
    .title{
      background: #009a61;
      color: #fff;
      font-weight: 600;
      &:hover{
        background-color: #009a61;
      }
    }
    li{
      text-align: left;
      padding:5px 20px;
      width: 130px;
      margin-bottom: 5px;
      cursor: pointer;
      color: #757575;
      border-radius: 3px;
      &:hover,&.active{
        background-color: rgba(0,154,97,0.08);
      }
      img{
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-right: 10px;
      }
    }
  }
</style>
