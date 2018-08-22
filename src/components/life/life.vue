<template>
  <div class="life">
    <div class="left">
      占位
    </div>
    <div class="middle">
      <!-- 生活类文章列表 -->
      <p class="title-bar">生活专栏</p>
      <ul class="blogList">
        <li v-for="(item,index) in blogList" :key="index" @click="toDetail(item.id)" v-loading="loading">
          <div class="title">{{item.title}}</div>
          <div class="cont">{{item.content}}</div>
          <div class="footer">
            <span class="author">{{item.author}}</span>
            <span class="circle"></span>
            <span class="time">{{item.updateTime ? item.updateTime : item.createTime}}</span>
          </div>
        </li>
      </ul>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageNum"
        layout="total, prev, pager, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div class="right">
       占位
    </div>
  </div>
</template>

<script>
import { allBlogs } from '@/assets/js/api.js'

export default {
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
    this.allBlogs()
  },
  methods: {
    allBlogs () {
      let { pageNum, page } = this
      let params = {
        pageNum,
        page,
        type: this.$route.query.typeId
      }
      allBlogs(params)
        .then(res => {
          let data = res.data
          if (res.status === 1) {
            this.loading = false
            this.blogList = data.list
            this.total = data.count
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        })
        .catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
    },
    toDetail (id) {
      this.$router.push({name: 'blogDetail', query: {blogId: id}})
    },
    // 分页
    handleSizeChange (val) {
      this.pageNum = val
      this.loading = true
      this.allBlogs()
    },
    handleCurrentChange (val) {
      this.page = val
      this.loading = true
      this.allBlogs()
    }
  }
}
</script>

<style scoped lang='less'>
.life {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left,
  .right {
    width: 170px;
    height: 100px;
  }
  .middle {
    width: 760px;
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
      li {
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
