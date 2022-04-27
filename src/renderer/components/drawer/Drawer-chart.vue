<template>
  <div class="Container">
    <p class="Drawer-heading">Charts</p>
    <!-- <div class="Charts-wrapper"> -->
        <transition-group class="Charts-wrapper" name="onebyone">
            <div class="Chart-item" v-for="(item) in list" :key="item.time" :title="item.time">
                <canvas :id="'logDial' + item.time">{{ drawArc(item.time, item.fulfill / item.total)}}</canvas>
            </div>
        </transition-group>
    <!-- </div> -->
  </div>
</template>

<script>
import { store } from '@/utils/ElectronStore'

export default {
  name: 'DrawerAbout',
  data() {
    return {
      list: [],
      start: 0,
      lastTime: 0,
      loopCount: 0
    }
  },
  watch: {
    loopCount: function(val) {
      const el = document.querySelector('.Charts-wrapper')
      if (val < this.getBreakLog.length * 2) {
        el.setAttribute('style', 'overflow:hidden;')
      } else {
        el.setAttribute('style', 'overflow:auto;')
      }
    }
  },
  computed: {
    getBreakLog() {
      return store.get('items')
    }
  },
  mounted() {
    this.pushItems()
  },
  methods: {
    pushItems(timestamp) {
      if (!this.start) this.start = timestamp
      if (!this.lastTime) this.lastTime = timestamp
      this.lastTime = timestamp
      this.loopCount++
      if (this.loopCount < this.getBreakLog.length) {
        this.list.push(this.getBreakLog[this.loopCount])
      }
      const drawTask = window.requestAnimationFrame(this.pushItems)
      if (this.loopCount >= this.getBreakLog.length * 2) {
        cancelAnimationFrame(drawTask)
      }
    },
    drawArc(id, percent) {
      this.$nextTick(() => {
        const element = document.getElementById('logDial' + id)
        const bgVar = document.documentElement.style.getPropertyValue('--color-background')
        const shortVar = document.documentElement.style.getPropertyValue('--color-short-round')
        const size = 34
        const arcRadiusRatio = 0.5 // 0.55
        const arcLineWidthRatio = 1 // 0.3
        const bgColor = !bgVar ? '#2F384B' : bgVar
        const fgColor = !shortVar ? '#05EB8B' : shortVar
        const outerRadius = size / 2
        const innerRadius = outerRadius * arcRadiusRatio
        const lineWidth = outerRadius * arcLineWidthRatio
        const fullCircle = 2 * Math.PI
        const startAngle = -Math.PI / 2
        const endAngle = percent * fullCircle + startAngle
        const center = outerRadius
        const ctx = element.getContext('2d')
        element.width = size
        element.height = size
        ctx.fillStyle = bgColor
        ctx.strokeStyle = fgColor
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.arc(center, center, innerRadius, startAngle, endAngle, false)
        ctx.fill()
        ctx.stroke()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color: var(--color-short-round);
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0.5em 0;
}

.Container {
  max-height: calc(100% - 36px);
  overflow-x: hidden;
  overflow-y: auto;
}

.Charts-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
}

.Chart-item {
  height: 34px;
  width: 34px;
  border-radius: 100%;
  margin: 1.48em 0.48em;
  background-color: var(--color-background);
}

.label {
  font-size: 14px;
  letter-spacing: 0.05em;
  line-height: 2;
  & .link,
  &.link {
    cursor: pointer;
    transition: $transitionDefault;
    &:hover {
      color: var(--color-accent);
    }
  }
}

.onebyone-enter-active,
.onebyone-leave-active {
  transition: all 0.2s ease-in;
}

.onebyone-enter,
.onebyone-leave-to {
  opacity: 0;
  transform: translate(4px, 34px);
}

</style>
