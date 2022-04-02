<template>
  <div id="app">
    <header>
      <h1 class="emotion">:)</h1>
      </header>
      <a class="description">Your device is perfectly stable and is running with absolutely no problems whatsoever.<br><p><span>{{progress}}</span>% complete</p></a>
      <table>
      <tr>
          <td><div id="qrcode" style="padding: 16px; width: 110px; height: 110px; background: #fff; display: inline-block"></div></td>
          <td style="position: absolute; margin-top: -23px;">
          <p style="margin-left: 8px; margin-top: 18px;"><small>For more information ablout this issue and possible fixes, visit https://www.windows.com/stopcode<br><a style="text-decoration:none; color: #FFF"></a></small></p>
          <p style="margin-left: 8px; margin-top: 40px;"><small>You can search for this status code online if you'd like.</small></p>
          <p style="margin-left: 8px; margin-top: -8px;"><small>Status code: ALL_SYSTEMS_GO</small></p>
          </td>
      </tr>
      </table>
  </div>
</template>

<script>
import { EventBus } from '@/utils/EventBus'
import QRCode from 'qrcodejs2'
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
      let cursor = 0
      const arr = this.randomProgress()
      const time = setInterval(() => {
        this.progress += arr[cursor]
        cursor++
        this.breakTime--
        if (this.breakTime === 0) {
          clearInterval(time)
          ipcRenderer.send('close-break-window', null)
        }
      }, 1000)
    },

    skipBreak() {
      EventBus.$emit('timer-completed')
    },

    generateQR() {
      this.QRCode = new QRCode(document.getElementById('qrcode'), {
        text: 'https://www.windows.com/stopcode',
        width: 110,
        height: 110,
        colorDark: '#106faa',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
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
    this.generateQR()
  }
}
</script>

<style lang="scss">
html,body {
  width: 100%;
  height: 100%;
  overflow: hidden;
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

h1, h2, h3, h4, h5, h6 {
  font-family: "Segoe UI Light";
  font-weight: 300;
}

body {
  font-family: "Segoe UI";
  color: #FFF;
  background: #106faa;
  margin: 0;
}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

#app {
  margin: 5% 8%;
  margin-right: 30%;
}

.emotion {
  font-family: "Segoe UI";
  font-size: 8em;
  margin: 0;
}

.description {
  font-size: 1.4em;
  margin-bottom: 3em;
}

footer small {
  font-size: 0.8em;
}

</style>
