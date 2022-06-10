<template>
  <div class="Container">
    <p class="Drawer-heading">Charts</p>
    <div class="Heatmap-wrapper" v-show="chartType =='month'">
      <div id="cal-heatmap"></div>
    </div>
    <div class="Charts-wrapper" v-show="chartType =='day'">
      <div class="Chart-item" v-for="(item) in dayBreakLog" :key="item.time" :title="item.fulfill + '/' + item.total">
         <svg :id="'logDial' + item.time" class="Dial-fill" width="36px" height="36px" xml:space="preserve" viewBox="0 0 36 36">
            <circle r="8.999" cx="18" cy="18" stroke-width="18"/>
          </svg>
      </div>
    </div>
    <div class="chart-button-group">
      <div class="chart-button" v-show="chartType =='month'" id="previousSelector-a-previous"> Prev </div>
      <div class="chart-button" v-show="chartType =='month'" id="previousSelector-a-next"> Next </div>
      <div class="chart-button" v-show="chartType =='day'" @click="chartType='month'"> Back </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/utils/ElectronStore'
import anime from 'animejs'
import * as d3 from 'd3'
import CalHeatMap from 'cal-heatmap'

export default {
  name: 'DrawerAbout',
  data() {
    return {
      chartType: 'month', // month, day
      dayBreakLog: []
    }
  },
  mounted() {
    this.initCalHeatMap()
  },
  methods: {
    getBreakLog() {
      return store.getYear()
    },
    getBreakLogDay(day) {
      return store.getDay(day)
    },
    initCalHeatMap() {
      const cal = new CalHeatMap()
      cal.init({
        range: 2,
        cellSize: 14,
        cellRadius: 3,
        cellPadding: 5,
        domainGutter: 28,
        domainMargin: [42, 0, 0, 0],
        domainDynamicDimension: false,
        legendMargin: [42, 0, 0, 0],
        legendVerticalPosition: 'bottom',
        legendHorizontalPosition: 'left',
        domain: 'month',
        subDomain: 'x_day',
        start: new Date(2022, 4, 1),
        itemName: ['second', 'seconds'],
        subDomainDateFormat: '%Y-%m-%d',
        previousSelector: '#previousSelector-a-previous',
        nextSelector: '#previousSelector-a-next',
        data: this.getBreakLog(),
        dataType: 'json',
        onClick: this.clickHeatMapCell
      })
    },
    clickHeatMapCell(date, value) {
      if (value !== null) {
        this.dayBreakLog = this.getBreakLogDay(date)
        this.chartType = 'day'
        this.$nextTick(() => {
          for (const item of this.dayBreakLog) {
            this.dialAnimation(600, item.time, item.fulfill / item.total)
          }
        })
      }
    },
    dialAnimation(duration, id, percent) {
      this.dial = anime({
        targets: `#logDial${id} circle`,
        strokeDashoffset: function(el) {
          var svgLength = anime.setDashoffset(el)
          return [svgLength * (1 - percent), svgLength]
        },
        easing: 'easeInOutQuad',
        duration: duration,
        direction: 'reverse',
        autoplay: true
      })
      this.dial.seek(this.dial.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/cal-heatmap.css';
.Container {
  max-height: calc(100% - 36px);
  overflow-y: auto;
}

.Heatmap-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#cal-heatmap {
  height: 300px;
}

.chart-button-group {
  position: absolute;
  bottom: 36px;
  width: 100%;
  margin-left: -18px;
  display: flex;
  justify-content: center;
}

.chart-button {
  font-size: 1rem;
  font-family: monospace;
  max-width: 50px;
  text-align: center;
  color: var(--color-background-lightest);
  border-radius: 0.2rem;
  border: 2px solid transparent;
  padding: 2px 4px;
  margin: 1rem;
  background: var(--color-background);
}

.chart-button:hover {
  color: var(--color-accent);
}

.Charts-wrapper {
  height: 320px;
  width: 320px;
  display: grid;
  grid-template-rows: 78px 78px 78px 78px;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
}

.Charts-wrapper::after {
  content: '';
  flex: auto;
}

.Chart-item {
  height: 34px;
  width: 34px;
  border-radius: 100%;
  margin: 1.48em 0.48em;
  background-color: var(--color-background);
}

.Dial-fill {
  border-radius: 50%;
  background-color: var(--color-background);
  transform-origin: center;
  transform: rotate(-90deg);
  -webkit-app-region: no-drag;
}

.Dial-fill circle {
  fill: var(--color-background);
  stroke: var(--color-short-round);
}

</style>
