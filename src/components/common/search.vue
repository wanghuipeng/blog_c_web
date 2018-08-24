<template>
  <div class="searchBlock">
    <left-block />
    <div class="middle">
      <!-- 生活类文章列表 -->
      <p class="result-bar">找到约 <span class="green">{{total}}</span> 条结果</p>
      <ul class="blogList">
        <li v-for="(item,index) in blogList" :key="index" @click="toDetail(item.id)" v-loading="loading">
          <div class="left">
            <div class="from">来自作者<span class="ml-5">{{item.author}}</span></div>
            <div class="title">{{item.title.substring(0,item.title.indexOf(keyword))}}<strong style="color:#D0021B;">{{keyword}}</strong>{{item.title.substring(item.title.indexOf(keyword)+keyword.length,item.title.length)}}</div>
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
import { searchKeyword } from '@/assets/js/api.js'

export default {
  components: { leftBlock, rightBlock },
  computed: {
    keyword: function () {
      return this.$route.query.keyword
    }
  },
  data () {
    return {
      loading: true,
      pageNum: 10,
      page: 1,
      total: 0,
      blogList: []
    }
  },
  mounted () {
    this.searchKeyword()
  },
  methods: {
    searchKeyword () {
      let { pageNum, page, keyword } = this
      let params = {
        pageNum,
        page,
        keyword
      }
      searchKeyword(params).then(res => {
        let data = res.data
        if (res.status === 1) {
          this.loading = false
          this.blogList = data.list
          this.total = data.count
        } else {
          this.$notify({ title: res.msg, type: 'error', duration: 1000 })
        }
      }).catch(res => {
        this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
      })
    },
    toDetail (id) {
      this.$router.push({ name: 'blogDetail', query: { blogId: id } })
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
      this.searchKeyword()
    }
  },
  watch: {
    keyword (curVal, oldVal) {
      if (curVal !== oldVal) {
        this.page = 1
        this.searchKeyword()
      }
    }
  }
}
</script>

<style scoped lang='less'>
.searchBlock {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .middle {
    width: 660px;
    .result-bar {
      color: #757575;
      height: 20px;
      line-height: 20px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      .green{
          font-weight: 600;
      }
    }
    .block {
      background-color: #e9eef3;
    }
  }
}
</style>
