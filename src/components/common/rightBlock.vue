<template>
  <div class="right">
    <div class="alert">
      博客部分数据来自<a href="https://segmentfault.com/" target="_blank" class="green">segmentDefault</a>
    </div>
    <p class="title">活动推荐<a class="green" href="https://segmentfault.com/events" target="_blank">更多</a></p>
    <div class="actList">
      <a class="activity-recommend-item" v-for="(item,index) in lists" :key="index" :href="`https://segmentfault.com/${item.sd_id}`" target="_blank">
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
import { activities } from '@/assets/js/api.js'

export default {
  data () {
    return {
      lists: []
    }
  },
  created () {
    this.activities()
  },
  methods: {
    activities () {
      activities()
        .then(res => {
          let data = res.data
          if (res.status === 1) {
            this.lists = data
          } else {
            this.$notify({ title: res.msg, type: 'error', duration: 1000 })
          }
        })
        .catch(res => {
          this.$notify({ title: '服务器异常', type: 'error', duration: 1000 })
        })
    }
  }
}
</script>

<style scoped lang='less'>
.right {
  .alert {
    background-color: #fcf8e3;
    color: #8a6d3b;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #faebcc;
    border-radius: 4px;
    text-align: left;
    white-space: nowrap;
    a{
      float: none;
      display: inline-block;
      padding-left: 5px;
    }
  }
  .title {
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #212121;
    margin-bottom: 15px;
  }
  .green {
    float: right;
    cursor: pointer;
    font-size: 14px;
    &:hover {
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
