<script type="text/ecmascript-6">
import VLine from '../vline'
import VBar from '../vbar'
import VHistogram from '../vhistogram'
import VTable from '../vtable'
import VIndicator from '../vindicator'
import VPie from '../vpie'
import VRadar from '../vradar'
import VRing from '../vring'
import VScatter from '../vscatter'
import VMap from '../vmap'

const dict = {
  line: 'v-line',
  bar: 'v-bar',
  histogram: 'v-histogram',
  table: 'v-table',
  indicator: 'v-indicator',
  pie: 'v-pie',
  radar: 'v-radar',
  ring: 'v-ring',
  scatter: 'v-scatter',
  map: 'v-map'
}

export default {
  name: 'v-chart',
  components: {
    VLine, VBar, VTable, VIndicator,
    VHistogram, VPie, VRadar, VRing, VScatter, VMap
  },
  render (createElement) {
    this.chart = createElement(dict[this.type], {
      props: {
        data: this.data,
        settings: this.settings
      },
      ref: 'chart'
    })
    return this.chart
  },
  props: {
    type: { type: String, default: 'line' },
    data: { type: [Object, Array], default () { return {} } },
    settings: { type: Object, default () { return {} } }
  },
  mounted () {
    console.log('mounted', this.chart)
  },
  methods: {
    chartResize () {
      console.log('chartResize', this.$refs.chart)
      this.$refs.chart.echartsResize()
    }
  }
}
</script>
