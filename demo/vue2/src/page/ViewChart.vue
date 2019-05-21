<template>
  <div>
    <button @click="load">加载数据</button>
    <vi-line :data="chartData" :loading="loading" :dataEmpty="empty"></vi-line>
    <h3> v chart </h3>
    <vi-chart :data="chartData" :loading="loading" :dataEmpty="empty" :settings="chartSettings"></vi-chart>
  </div>
</template>

<script type="text/ecmascript-6">
  import ViLine from 'view-echarts/lib/line'
  import ViChart from 'view-echarts/lib/chart'
  export default {
    data () {
      return {
        chartData: [],
        chartSettings: {
          type: 'line'
        },
        loading: false,
        empty: true,
        line_data: {
          columns: ['日期', '访问用户', '下单用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    },
    methods: {
      load () {
        this.loading = true
        this.empty = false
        setTimeout(_ => {
          this.loading = false
          this.chartData = this.line_data
      }, 2000)
      }
    },
    components: { ViLine, ViChart }
  }
</script>
