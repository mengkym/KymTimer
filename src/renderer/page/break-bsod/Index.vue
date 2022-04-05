<template>
  <div id="app">
    <header>
      <h1 class="emotion">:)</h1>
    </header>
      <a class="description">
        Your PC is perfectly stable and is running <br> with absolutely no problems whatsoever.
        <p class="progress"><span>{{progress}}</span>% complete</p>
      </a>
      <table>
      <tr>
          <td>
            <p>
              <small>You can search for this status code online if you'd like: ALL_SYSTEMS_GO</small>
            </p>
          </td>
      </tr>
      </table>
  </div>
</template>

<script>
import { EventBus } from '@/utils/EventBus'
import { ipcRenderer } from 'electron'

export default {
  name: 'Index',
  data() {
    return {
      breakTime: 0,
      progress: 0,
      QRCode: null
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
        this.progress = ((1 - this.breakTime / this.shortBreakTime) * 100).toFixed(2)
        if (this.breakTime === 0) {
          clearInterval(time)
          ipcRenderer.send('close-break-window', null)
        }
      }, 1000)
    },

    skipBreak() {
      EventBus.$emit('timer-completed')
    },

    randomProgress() {
      const arr = new Array(100).fill(0)
      for (let i = 0; i < 100; i++) {
        var num = parseInt((Math.random() * 100).toString())
        arr[num]++
      }
      return arr
    }
  },

  mounted() {
    this.startAnime()
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  margin-bottom: 4em;
}

html,body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Segoe UI Light";
  font-weight: 300;
}

body {
  font-family: "Segoe UI";
  color: #FFF;
  background: #106faa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.emotion {
  font-family: "Segoe UI";
  font-size: 12em;
  margin: 0;
}

.description {
  font-size: 2em;
  margin-bottom: 1.5em;
}

.progress {
  margin-top: 0.5em;
}

@font-face {
    font-family: Segoe UI;
    src:
        local("Segoe UI Light"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2) format("woff2"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff) format("woff"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf) format("truetype");
    font-weight: 100;
}

@font-face {
    font-family: Segoe UI;
    src:
        local("Segoe UI Semilight"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff2) format("woff2"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff) format("woff"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.ttf) format("truetype");
    font-weight: 200;
}

@font-face {
    font-family: Segoe UI;
    src:
        local("Segoe UI"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"),
        url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");
    font-weight: 400;
}

</style>
