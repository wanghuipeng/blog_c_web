<template>
  <div class="main busiManage">
    <el-tabs v-model="editableTabsValue" type="card"  @tab-remove="removeTab">
      <el-tab-pane
        label="商机列表"
        name="1"
      >
        <anchor :breadcrumb='breadcrumb' />
        <busi-header />
        <!-- 导出 -->
        <el-button type="primary" class="exportExcel" size="mini" v-if='activeTabName !== "total"' @click="exportExcel">导出excel</el-button>
        <el-tabs v-model="activeTabName" class="pt-0" @tab-click="handleClick">
          <el-tab-pane label="商机汇总" name="total">
            <busi-total-table @addTab="addTab"></busi-total-table>
          </el-tab-pane>
          <el-tab-pane label="商机明细" name="detail">
            <busi-detail-table v-if="activeTabName === 'detail'"></busi-detail-table>
          </el-tab-pane>
          <el-tab-pane label="复购查询" name="repeat">
            <busi-repeat-table v-if="activeTabName === 'repeat'"></busi-repeat-table>
          </el-tab-pane>
          <el-tab-pane label="补货查询" name="supply">
            <busi-supply-table v-if="activeTabName === 'supply'"></busi-supply-table>
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>

      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        closable
      >
        <anchor :breadcrumb='breadcrumb1' />
        <add-business />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import anchor from '@/components/common/anchor'
import busiHeader from '@/components/business/busiHeader'
import addBusiness from '@/components/business/addBusiness'
import busiTotalTable from '@/components/business/table/busiTotalTable'
import busiDetailTable from '@/components/business/table/busiDetailTable'
import busiRepeatTable from '@/components/business/table/busiRepeatTable'
import busiSupplyTable from '@/components/business/table/busiSupplyTable'
import { mapMutations } from 'vuex'

export default {
  components: { anchor, busiHeader, addBusiness, busiTotalTable, busiDetailTable, busiRepeatTable, busiSupplyTable },
  data () {
    return {
      editableTabsValue: '1',
      editableTabs: [],
      tabIndex: 1,
      breadcrumb: ['商机管理', '商机列表'], // 面包屑导航
      breadcrumb1: ['商机管理', '商机列表', '添加商机'],
      activeTabName: 'total' // 当前tab
    }
  },
  methods: {
    ...mapMutations([
      'setLoadingTrue',
      'setActiveTabName',
      'setExportTrue'
    ]),
    // 触发excel导出
    exportExcel () {
      this.setExportTrue()
    },
    // 标签切换
    handleClick () {
      this.setActiveTabName(this.activeTabName)
    },
    addTab (obj) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs = [] // 初始化清空动态标签页
      this.editableTabs.push({
        title: obj.title,
        name: newTabName,
        show: obj.show
      })
      this.editableTabsValue = newTabName
    },
    removeTab (targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            } else {
              // 如果不存在，将active指向首页1
              activeName = '1'
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style lang='less'>
.busiManage{
  .el-tabs{
    .el-tabs{
      .table{
        padding: 0;
      }
      .el-tabs__content{
        padding: 0 !important;
      }
    }
  }
}
</style>
