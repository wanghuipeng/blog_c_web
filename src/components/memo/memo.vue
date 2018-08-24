<template>
  <div class="memo">
    <left-block />
    <div class="middle">
      <!-- 备忘类文章列表 -->
      <p class="title-bar">备忘专栏</p>
      <ul class="blogList">
        <li v-for="(item,index) in blogList" :key="index" @click="toDetail(item.id)" v-loading="loading">
          <div class="left">
            <div class="from">来自作者<span class="ml-5">{{item.author}}</span></div>
            <div class="title">{{item.title}}</div>
            <div class="cont">{{item.content}}</div>
            <div class="footer">
              <span class="author">{{item.author}}</span>
              <span class="circle"></span>
              <span class="time">{{item.updateTime ? item.updateTime : item.createTime}}</span>
            </div>
          </div>
          <div class="right">
            <img :src="item.thumbnail" />
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
    <right-block />
  </div>
</template>

<script>
import leftBlock from '@/components/common/leftBlock'
import rightBlock from '@/components/common/rightBlock'
import { allBlogs } from '@/assets/js/api.js'

export default {
  components: { leftBlock, rightBlock },
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
.memo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  }
}
</style>
