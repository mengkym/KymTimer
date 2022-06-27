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
          ipcRenderer.send('close-break-window', {
            total: this.shortBreakTime,
            fulfill: this.shortBreakTime - this.breakTime
          })
        }
      }, 1000)
    },

    handleTrigger(event) {
      const theEvent = window.event || event
      const code = theEvent.keyCode || theEvent.which || theEvent.charCode
      if (code === 27) {
        ipcRenderer.send('skip-break', null)
        ipcRenderer.send('close-break-window', {
          total: this.shortBreakTime,
          fulfill: this.shortBreakTime - this.breakTime
        })
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
  // background: center center / cover rgba(244, 247, 254, 0.2);
  background: rgba(0,0,0,.5);
  backdrop-filter: blur(5px)
}

#break {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: red;
  font-size: 64px;
  filter: grayscale(80%) saturate(.1) drop-shadow(4px 0 0 red) drop-shadow(-4px 0 0 cyan);
}
</style>
