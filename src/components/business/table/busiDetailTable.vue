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
          prop="checkMethod"
          label="核算方法"
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
            <p v-show="false">{{scope.row.time = scope.row.orderStartTime + '--' +scope.row.orderEndTime}}</p>
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
import { busiDetailTable, listReplenishmentDetail } from '@/assets/js/api.js'
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
      tableData: [{
        time: ''
      }]
    }
  },
  created () {
    this.setLoadingTrue()
    // this.fetchDetailList()
  },
  methods: {
    ...mapMutations([
      'setLoadingFalse',
      'setLoadingTrue',
      'setExportFalse'
    ]),
    // 导出excel表格
    exportExcel () {
      let params = {
        'mediaName': '58',
        'page': 1,
        'pageSize': 10,
        'source': '渠道',
        'timeEnd': '2018-05-30',
        'timeStart': '2018-05-01'
      }
      listReplenishmentDetail(params).then(res => {
        this.tableData = res.data.rows
        require.ensure([], () => {
          const { export_json_to_excel: exportJsonToExcel } = require('../../../assets/js/excel/Export2Excel')
          const tHeader = ['月份', '一级巴', '首次预购单价', '首次预购总数量', '媒体名称', '预购总价', '实购数量']
          const filterVal = ['month', 'firstBar', 'firstPrepurchasePrice', 'firstPrepurchaseTotalNumber', 'mediaName', 'prepurchaseTotalPrice', 'realNumber']
          const list = this.tableData
          console.log(list)
          const data = this.formatJson(filterVal, list)
          exportJsonToExcel(tHeader, data, '商机明细excel')
        })
      })
      // require.ensure([], () => {
      //   const { export_json_to_excel: exportJsonToExcel } = require('../../../assets/js/excel/Export2Excel')
      //   const tHeader = ['月份', '一级巴', '来源', '媒体名称', '核算方法', '首次预购总数量', '首次预购总价', '预购总价', '预购数量', '订购数量', '实购数量', '订购开始结束时间']
      //   const filterVal = ['month', 'firstBar', 'source', 'media', 'checkMethod', 'firstTotalNum', 'firstSinglePrice', 'totalPrice', 'totalNum', 'orderNum', 'buyNum', 'time']
      //   const list = this.tableData
      //   const data = this.formatJson(filterVal, list)
      //   exportJsonToExcel(tHeader, data, '商机明细excel')
      // })
    },
    // 格式化excel表格
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 获取列表数据
    fetchDetailList () {
      let params = {
        page: this.currentPage,
        size: this.pageSize
      }
      busiDetailTable(params).then(res => {
        this.setLoadingFalse()
        this.tableData = res.rows
        this.total = res.total
      })
    },
    // 分页控制
    handleSizeChange (val) {
      this.pageSize = val
      this.setLoadingTrue()
      this.fetchDetailList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.setLoadingTrue()
      this.fetchDetailList()
    }
  },
  watch: {
    // 监听tab切换，列表重新刷新数据
    activeTabName: function (val) {
      this.currentPage = 1
      this.size = 12
      this.setLoadingTrue()
      if (val === 'detail') {
        this.fetchDetailList()
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
