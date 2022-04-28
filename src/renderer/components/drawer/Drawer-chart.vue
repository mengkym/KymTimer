<template>
  <div class="Container">
    <p class="Drawer-heading">Charts</p>
    <div class="Charts-wrapper">
      <div class="Chart-item" v-for="(item) in getBreakLog" :key="item.time" :title="item.fulfill + '/' + item.total">
         <svg :id="'logDial' + item.time" class="Dial-fill" width="36px" height="36px" xml:space="preserve" viewBox="0 0 36 36">
            <circle r="8.999" cx="18" cy="18" stroke-width="18"/>
          </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/utils/ElectronStore'
import anime from 'animejs'

export default {
  name: 'DrawerAbout',
  data() {
    return {
      dial: null
    }
  },
  computed: {
    getBreakLog() {
      return store.getAll()
    }
  },
  mounted() {
    this.pushItems()
  },
  methods: {
    pushItems() {
      for (const item of this.getBreakLog) {
        this.dialAnimation(600, item.time, item.fulfill / item.total)
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
.Container {
  max-height: calc(100% - 36px);
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
