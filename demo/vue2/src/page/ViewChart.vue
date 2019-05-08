<template>
  <div>
    <div　:style="chartStyle">
      <v-histogram :data="chartData" ref="chart1"> </v-histogram>
    </div>
    <div　:style="chartStyle">
      <v-line :data="chartData" ref="chart2"> </v-line>
    </div>

    <div　:style="chartStyle">
      <v-chart :data="chartData" ref="chart3" type="bar"> </v-chart>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import VHistogram from '../components/view-chart/vhistogram'
  import VLine from '../components/view-chart/vline'
  import VChart from '../components/view-chart/vchart'
  export default {
    name: 'ViewChart',
    components: {
      // HelloWorld, DragItem, PlumbView,
      // RenderView
      VHistogram, VLine, VChart
    },
    data () {
      return {
        chartData2: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            ['1/1', '1193', '1199', '0.32' ],
            ['1/2', '1293', '2199', '0.32' ],
            ['1/3', '1393', '3199', '0.32' ],
            ['1/4', '1493', '4199', '0.32' ]
          ]
        },
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        chartStyle: 'width: 400px;height: 400px;'
      }
    },
    mounted () {
      console.log(this.chartStyle)
      console.log(this.$refs.chart)
      setTimeout(this.changeStyle, 3000)
    },
    methods:{
      changeStyle() {
        let w = 300 + Math.floor((Math.random()*10)+1) * 30;

        this.chartStyle = 'width: ' + w + 'px;height: '+ w + 'px;'
        this.$refs.chart1.echartsResize()
        console.log('echart2', this.$refs.chart2.echarts)
        this.$refs.chart2.echartsResize()
        console.log('echart3', this.$refs.chart3)
        this.$refs.chart3.chartResize()
        setTimeout(this.changeStyle, 3000)
      }
    }
  }
</script>
<style>
  .vchart {
    width: 400px;
    height: 400px;
  }

</style>
