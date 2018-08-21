<template>
  <div class="addBusiness">
      <div class="add-operation">
        <el-button type="success" size="mini" @click="addItem">添加</el-button>
        <el-button type="primary" size="mini" @click="sureItem">确定</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="month"  label="月份" width="80"></el-table-column>
        <el-table-column prop="firstBar" label="一级巴"></el-table-column>
        <el-table-column prop="source" label="来源" width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.source" size="mini">
              <el-option label="今日头条" value="source1"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="media" label="媒体名称" width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.media" size="mini">
              <el-option label="58" value="media1"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="checkMethod" label="核算方法" width="175">
          <template slot-scope="scope">
            <el-select v-model="scope.row.checkMethod" size="mini" @change="checkFunc(scope.row.checkMethod)">
              <el-option :label="item.name" :value="item.id" v-for="item in methodArr" :key="item.id" ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="firstTotalNum" label="首次预购总数量" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.firstTotalNum" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="firstSinglePrice,checkMethod" label="首次预购单价" width="200">
          <template slot-scope="scope">
            <el-form  label-width="100px" size="mini" v-if="scope.row.checkMethod === 1">
              <el-form-item label="预购单价：" class="mb-0">
                <el-input></el-input>
              </el-form-item>
            </el-form>
            <el-form  label-width="100px" size="mini" v-if="scope.row.checkMethod === 2">
              <el-form-item label="佣金比例：" class="mb-0">
                <el-input></el-input>
              </el-form-item>
            </el-form>
            <el-form  label-width="100px" size="mini" v-if="scope.row.checkMethod === 3">
              <el-form-item label="放款比例：" class="mb-0">
                <el-input></el-input>
              </el-form-item>
            </el-form>
            <el-form  label-width="100px" size="mini" v-if="scope.row.checkMethod === 4">
              <el-form-item label="预购单价：" class="mb-0">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="佣金比例：" class="mb-0">
                <el-input></el-input>
              </el-form-item>
            </el-form>
            <el-form  label-width="100px" size="mini" v-if="scope.row.checkMethod === 5">
              <el-form-item label="预购单价：" class="mb-0">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="放款比例：" class="mb-0">
                <el-input></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="预购总价"></el-table-column>
        <el-table-column prop="totalNum" label="预购数量"></el-table-column>
        <el-table-column prop="orderNum" label="订购数量"></el-table-column>
        <el-table-column prop="buyNum" label="实购数量"></el-table-column>
        <el-table-column prop="time" label="订购开始结束时间" width="160">
          <template slot-scope="scope">
            <div class="mtb-5"><el-date-picker v-model="scope.row.startDate" type="date" :picker-options="pickerOptions" placeholder="开始时间" size="mini" class="w-130"></el-date-picker></div>
            <div class="mtb-5"><el-date-picker v-model="scope.row.endDate" type="date" :picker-options="pickerOptions" placeholder="结束时间" size="mini" class="w-130"></el-date-picker></div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="saveItem">保存</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini" @click="supplyItem">补货</el-button>
            <el-button type="text" size="mini" @click="repeatItem">复购</el-button>
            <el-button type="text" size="mini">拒绝复购</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 补货dialog -->
      <el-dialog
        title="补货"
        :visible.sync="supplyDialogVisible"
        width="30%"
        >
        <el-form :model="supplyForm" label-width="100px">
          <el-form-item label="购买巴信息：">
            <el-input v-model="supplyForm.buyBar" disabled></el-input>
          </el-form-item>
          <el-form-item label="媒体信息：">
            <el-input v-model="supplyForm.media" disabled></el-input>
          </el-form-item>
          <el-form-item label="预购价格：">
            <el-input v-model="supplyForm.price"></el-input>
          </el-form-item>
          <el-form-item label="预购数量：">
            <el-input v-model="supplyForm.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="cancelBtn" size="small">放弃</el-button>
            <el-button type="primary" @click="saveBtn" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 复购dialog -->
      <el-dialog
        title="复购商机添加"
        :visible.sync="repeatDialogVisible"
        width="30%"
        >
        <el-form :model="repeatForm" label-width="100px">
          <el-form-item label="购买巴信息：">
            <el-input v-model="repeatForm.buyBar" disabled></el-input>
          </el-form-item>
          <el-form-item label="媒体信息：">
            <el-input v-model="repeatForm.media" disabled></el-input>
          </el-form-item>
          <el-form-item label="预购价格：">
            <el-input v-model="repeatForm.price"></el-input>
          </el-form-item>
          <el-form-item label="预购数量：">
            <el-input v-model="repeatForm.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="cancelBtn" size="small">放弃</el-button>
            <el-button type="primary" @click="saveBtn" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      supplyDialogVisible: false,
      repeatDialogVisible: false,
      methodArr: [
        {
          id: 1,
          name: '预购单价'
        },
        {
          id: 2,
          name: '佣金比例'
        },
        {
          id: 3,
          name: '放款比例'
        },
        {
          id: 4,
          name: '预购单价&佣金比例'
        },
        {
          id: 5,
          name: '预购单价&放款比例'
        }
      ],
      tableData: [{
        month: '2018-01',
        firstBar: '上海',
        source: '',
        media: '',
        checkMethod: 1,
        firstTotalNum: '200',
        firstSinglePrice: '50',
        totalPrice: '80000',
        totalNum: '200',
        orderNum: '50',
        buyNum: '0',
        startDate: '',
        endDate: ''
      }],
      supplyForm: {
        buyBar: '上海 浦西吧',
        media: '今日头条',
        price: '',
        num: ''
      },
      repeatForm: {
        buyBar: '上海 浦西吧',
        media: '今日头条',
        price: '',
        num: ''
      },
      pickerOptions: {// 限制日期选择范围为当月
        disabledDate: date => {
          let dateMonth = new Date()
          return date.getMonth() !== dateMonth.getMonth()
        }
      }
    }
  },
  methods: {
    // 提示框
    messageTip (message, type) {
      this.$message({
        showClose: true,
        message,
        type,
        duration: 1000
      })
    },
    // 添加商机
    addItem () {
      this.tableData.push({
        month: '2018-01',
        firstBar: '上海',
        source: '',
        media: '',
        checkMethod: '预购单价',
        firstTotalNum: '',
        firstSinglePrice: '',
        totalPrice: '',
        totalNum: '',
        orderNum: '',
        buyNum: '',
        startDate: '',
        endDate: ''
      })
    },
    // 核算方法选择
    checkFunc (id) {
      console.log(id)
    },
    // 确定
    sureItem () {
      this.messageTip('添加成功', 'success')
    },
    // 操作-保存
    saveItem () {
      this.messageTip('保存成功', 'success')
    },
    // 补货
    supplyItem () {
      this.supplyDialogVisible = true
    },
    // 复购
    repeatItem () {
      this.repeatDialogVisible = true
    },
    // 放弃
    cancelBtn () {
      this.supplyDialogVisible = false
    },
    // 保存
    saveBtn () {
      this.supplyDialogVisible = false
      this.messageTip('保存成功', 'success')
    }
  }
}
</script>

<style scoped lang='less'>
.addBusiness{
  .add-operation{
    margin-bottom: 15px;
  }
}
</style>
