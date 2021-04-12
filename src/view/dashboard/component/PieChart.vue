<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()

    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions(val) {
      this.chart.setOption(val)
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    initChart() {
      const vm = this
      vm.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)

      vm.chart.on('click', function(params) {
        vm.handlerClick(params.name)
      })
    },
    handlerClick(type) {
      this.$emit('pieClickEvent', type)
    }
  }
}
</script>
