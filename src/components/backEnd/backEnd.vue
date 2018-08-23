<template>
  <div class="backEnd">
    <left-block :linkName="link" />
    <div class="middle">
      <p class="title-bar">后端频道</p>
      <ul class="blogList">
        <a :href="'https://segmentfault.com'+item.sd_link" target="_blank" v-for="(item,index) in blogList" :key="index" v-loading="loading">
          <li>
            <div class="left">
              <div class="title">{{item.sd_title}}</div>
            <div class="cont">{{item.sd_content}}</div>
            <div class="footer">
              <span class="author">{{item.sd_author}}</span>
              <span class="circle"></span>
              <span class="time">{{item.sd_time}}</span>
            </div>
            </div>
            <div class="right">
              <img :src="item.sd_thumbnail" class="thumbnail" v-if="item.sd_img" />
            </div>
          </li>
        </a>
      </ul>
    </div>
    <div class="right">
       占位
    </div>
  </div>
</template>

<script>
import leftBlock from '@/components/common/leftBlock'
import { backEndBlog } from '@/assets/js/api.js'

export default {
  components: { leftBlock },
  data () {
    return {
      loading: true,
      pageNum: 10,
      page: 1,
      total: 0,
      blogList: []
    }
  },
  created () {
    this.backEndBlog()
    this.link = this.$route.name
  },
  methods: {
    backEndBlog () {
      backEndBlog()
        .then(res => {
          let data = res.data
          if (res.status === 1) {
            this.loading = false
            this.blogList = data
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        })
        .catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
    }
  }
}
</script>

<style scoped lang='less'>
.backEnd {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .right {
    .thumbnail{
        width: 80px;
        height: 60px;
        border-radius: 4px;
        float: right;
        margin-left: 30px;
        margin-top: 10px;
        background-size: cover;
        background-position: center;
    }
  }
  .middle {
    width: 660px;
    .title-bar {
      font-size: 16px;
      height: 20px;
      line-height: 20px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    .block {
      background-color: #e9eef3;
    }
    .blogList {
      padding: 15px 0;
      a {
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        margin-top: 40px;
        text-align: left;
        &:first-child {
          margin-top: 10px;
        }
        .title {
          font-weight: 500;
          font-size: 18px;
          line-height: 20px;
        }
        .cont {
          margin: 10px 0;
          font-size: 14px;
          color: #888;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .author {
          font-size: 12px;
          color: #888;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
