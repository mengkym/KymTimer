<template>
  <div id="break">
    <h1>{{breakTime}}</h1>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'BreakPage',
  data() {
    return {
      breakTime: 0
    }
  },

  computed: {
    // store getters
    shortBreakTime() {
      return this.$store.getters.timeShortBreak
    }
  },

  methods: {
    startAnime() {
      this.breakTime = this.shortBreakTime
      const time = setInterval(() => {
        this.breakTime--
        if (this.breakTime === 0) {
          clearInterval(time)
          ipcRenderer.send('close-break-window', null)
        }
      }, 1000)
    },

    handleTrigger(event) {
      const theEvent = window.event || event
      const code = theEvent.keyCode || theEvent.which || theEvent.charCode
      if (code === 27) {
        ipcRenderer.send('skip-break', null)
        ipcRenderer.send('close-break-window', null)
      }
    }
  },

  mounted() {
    this.startAnime()
    document.addEventListener('keydown', this.handleTrigger)
  }
}
</script>

<style lang="scss">
html,body {
  width: 100%;
  height: 100%;
  background: transparent;
}

#break {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.5;
}

h1 {
  color: red;
  font-size: 64px;
  filter: grayscale(80%) saturate(.1) drop-shadow(4px 0 0 red) drop-shadow(-4px 0 0 cyan);
}
</style>
