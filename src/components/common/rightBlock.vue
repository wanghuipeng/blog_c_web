<template>
  <div class="right">
    <p class="title">活动推荐<span class="green">更多</span></p>
    <div class="actList">
      <a class="activity-recommend-item" v-for="(item,index) in lists" :key="index" :href="'https://segmentfault.com/e/'+item.sd_id" target="_blank">
        <div class="activity-date pull-left">
          <div class="activity-date-wrapper">
            <div class="activity-date-up">{{item.sd_month}}</div>
            <div class="activity-date-down">{{item.sd_day}}</div>
          </div>
        </div>
        <div class="activity-detail">
          <div class="activity-detail-title">{{item.sd_title}}</div>
          <span class="activity-detail-base">{{item.sd_base}}</span><span class="dot">·</span>{{item.sd_date}}&nbsp;&nbsp;{{item.sd_week}}<span class="dot">·</span><span class="activity-state">{{item.sd_state}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lists: [
        {
          sd_id: '11111',
          sd_month: 'SEP',
          sd_day: '08',
          sd_title: '对话石AI技术',
          sd_base: '北京',
          sd_date: '09-08',
          sd_week: '周六',
          sd_state: '报名中'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang='less'>
.right{
  .title{
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #212121;
    margin-bottom: 15px;
  }
  .green{
    float: right;
    cursor: pointer;
    font-size: 14px;
    &:hover{
     text-decoration: underline;
    }
  }
  .actList {
  text-align: left;
  .pull-left {
    float: left !important;
  }
  .dot {
    color: #999;
    font-weight: normal;
    padding: 0 5px;
  }
  .activity-recommend-item {
    border-bottom: 1px dashed #eee;
    display: block;
    text-decoration: none;
    padding-top: 8px;
    padding-bottom: 8px;
    .activity-date {
      color: #017e66;
      margin-right: 10px;
      margin-top: 3px;
      text-align: center;
      .activity-date-wrapper {
        width: 32px;
        height: 34px;
        background: #c8e9de;
        border-radius: 2px;
        .activity-date-up {
          font-size: 12px;
          transform: scale(0.833);
        }
        .activity-date-down {
          font-size: 14px;
          border-radius: 2px;
          background: #ebf7f3;
          font-weight: 500;
          margin-top: -2px;
        }
      }
    }
    .activity-detail {
      color: #999;
      font-size: 12px;
      margin-left: 40px;
      .activity-detail-title {
        color: #212121;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 2px;
      }
      .activity-detail-base {
        font-size: 12px;
        color: #999;
      }
      .activity-state {
        font-size: 12px;
        color: #f5a623;
      }
    }
  }
}
}
</style>
