<template>
    <div class="table">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        v-loading = "isLoading"
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
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          >
        </el-table-column>
        <el-table-column
          prop="media"
          label="媒体名称"
          >
        </el-table-column>
        <el-table-column
          prop="firstTotalNum"
          label="首次预购总数量"
          >
        </el-table-column>
        <el-table-column
          prop="firstSinglePrice"
          label="首次预购单价"
          >
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="预购总价"
          >
        </el-table-column>
        <el-table-column
          prop="buyNum"
          label="实购数量"
          >
        </el-table-column>
        <el-table-column
          prop="repeatNum"
          label="复购数量"
          >
        </el-table-column>
        <el-table-column
          prop="repeatSinglePrice"
          label="复购单价"
          >
        </el-table-column>
        <el-table-column
          prop="repeatTotalPrice"
          label="复购总价"
          >
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
import { busiRepeatTable } from '@/assets/js/api.js'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isLoading',
      'activeTabName',
      'isExport'
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
    this.fetchRepeatList()
  },
  methods: {
    ...mapMutations([
      'setLoadingFalse',
      'setLoadingTrue',
      'setExportFalse'
    ]),
    // 获取列表数据
    fetchRepeatList () {
      let params = {
        page: this.currentPage,
        size: this.pageSize
      }
      busiRepeatTable(params).then(res => {
        this.setLoadingFalse()
        this.tableData = res.rows
        this.total = res.total
      })
    },
    // 导出excel表格
    exportExcel () {
      require.ensure([], () => {
        const { export_json_to_excel: exportJsonToExcel } = require('../../../assets/js/excel/Export2Excel')
        const tHeader = ['月份', '一级巴', '来源', '媒体名称', '首次预购总数量', '首次预购单价', '预购总价', '实购数量', '复购数量', '复购单价', '复购总价']
        const filterVal = ['month', 'firstBar', 'source', 'media', 'firstTotalNum', 'firstSinglePrice', 'totalPrice', 'buyNum', 'repeatNum', 'repeatSinglePrice', 'repeatTotalPrice']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '复购查询excel')
      })
    },
    // 格式化excel表格
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 分页控制
    handleSizeChange (val) {
      this.pageSize = val
      this.setLoadingTrue()
      this.fetchRepeatlList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.setLoadingTrue()
      this.fetchRepeatList()
    }
  },
  watch: {
    // 监听tab切换，列表重新刷新数据
    activeTabName: function (val) {
      this.currentPage = 1
      this.size = 12
      this.setLoadingTrue()
      if (val === 'repeat') {
        this.fetchRepeatList()
      }
    },
    // 监听isExport状态判断是否触发excel导出功能
    isExport: function (val) {
      if (val) {
        this.exportExcel()
        this.setExportFalse()
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
