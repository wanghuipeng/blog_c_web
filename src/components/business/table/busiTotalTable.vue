<template>
    <div class="table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        v-loading="isLoading"
        border
        style="width: 100%">
        <el-table-column
          prop="month"
          label="月份"
          width="80">
        </el-table-column>
        <el-table-column
          prop="firstBar"
          label="一级巴"
         >
          <template slot-scope="scope">
            <a @click="firstBarLink(scope.row)" class="link">{{scope.row.firstBar}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="firstTotalNum"
          label="首次预购总数量"
          >
        </el-table-column>
        <el-table-column
          prop="firstTotalPrice"
          label="首次预购总价"
          >
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="预购总价"
          >
        </el-table-column>
        <el-table-column
          prop="totalNum"
          label="预购数量"
          >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订购数量"
          >
        </el-table-column>
        <el-table-column
          prop="buyNum"
          label="实购数量"
          >
        </el-table-column>
        <el-table-column
          prop="time"
          label="订购开始结束时间"
          width="180">
          <template slot-scope="scope">
            <p>开始时间：{{scope.row.orderStartTime}}</p>
            <p>结束时间：{{scope.row.orderEndTime}}</p>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[12, 24, 36, 48]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
import { busiTotalTable } from '@/assets/js/api.js'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isLoading',
      'activeTabName'
    ])
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 12,
      total: 0,
      tableData: []
    }
  },
  created () {
    this.setLoadingTrue()
    this.fetchTotalList()
  },
  methods: {
    ...mapMutations([
      'setLoadingFalse',
      'setLoadingTrue'
    ]),
    // 获取列表数据
    fetchTotalList () {
      let params = {
        page: this.currentPage,
        size: this.pageSize
      }
      busiTotalTable(params).then(res => {
        this.setLoadingFalse()
        this.tableData = res.rows
        this.total = res.total
      })
    },
    // 分页控制
    handleSizeChange (val) {
      this.pageSize = val
      this.setLoadingTrue()
      this.fetchTotalList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.setLoadingTrue()
      this.fetchTotalList()
    },
    firstBarLink (row) {
      this.$emit('addTab', {title: row.firstBar, show: true})
    }
  },
  watch: {
    // 监听tab切换，列表重新刷新数据
    activeTabName: function (val) {
      this.currentPage = 1
      this.size = 12
      this.setLoadingTrue()
      if (val === 'total') {
        this.fetchTotalList()
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
