<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item class="w-140">
        <el-select v-model="formInline.check">
          <el-option label="全部核算方法" value="allCheck"></el-option>
          <el-option label="佣金核算" value="check1"></el-option>
          <el-option label="单个核算" value="check2"></el-option>
          <el-option label="放款金额核算" value="check3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-select v-model="formInline.media">
          <el-option label="全部媒体" value="allMedia"></el-option>
          <el-option label="今日头条" value="media1"></el-option>
          <el-option label="百度" value="media2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-select v-model="formInline.buy">
          <el-option label="全部" value="allBuy"></el-option>
          <el-option label="首购" value="buy1"></el-option>
          <el-option label="复购" value="buy2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="w-140">
        <el-input v-model="formInline.variety" placeholder="媒体名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          align="center"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="dateChange"
          class="w-220"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onFilter">筛选</el-button>
      </el-form-item>
    </el-form>
    <!-- 功能 -->
    <el-form :inline="true" :model="formInline1" class="demo-form-inline mt-15" size="mini">
      <el-form-item>
        <p>全部预购总价：14000</p>
      </el-form-item>
      <el-form-item>
          <el-date-picker
            v-model="formInline1.valueMonth"
            type="month"
            placeholder="选择月"
            class="w-110">
          </el-date-picker>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" size="mini" @click="addBusiness">添加查询商机</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valueMonth: '',
      formInline: {
        check: 'allCheck',
        media: 'allMedia',
        buy: 'allBuy'
      },
      formInline1: {
        valueMonth: ''
      },
      createTimeStart: '',
      createTimeEnd: '',
      dateValue: [],
      // 日期配置项
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    onFilter () {
      console.log('筛选!')
    },
    // 时间筛选设置
    dateChange (val) {
      if (val) {
        this.createTimeStart = val[0]
        this.createTimeEnd = val[1]
      } else {
        this.createTimeStart = ''
        this.createTimeEnd = ''
      }
    },
    // 添加商机
    addBusiness () {

    }
  }
}
</script>

<style scoped lang='less'>

</style>
