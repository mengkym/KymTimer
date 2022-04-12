<template></template>

<script>
import { EventBus } from '@/utils/EventBus'
import { ipcRenderer } from 'electron'
const path = require('path')
const exec = require('child_process').exec
// const cmdStr = 'server'
const cmdPath = path.join('static', '/exe/bluescreen.exe')
let workerProcess

export default {
  name: 'FullScreen',

  data() {
    return {
      fullscreen: null
    }
  },

  computed: {
    // store getters
    timeShortBreak() {
      return this.$store.getters.timeShortBreak
    },

    fullScreen() {
      return this.$store.getters.fullScreenBreak
    },

    breakType() {
      return this.$store.getters.breakType
    }
  },

  methods: {
    notifyShortBreak() {
      if (this.fullScreen) {
        // this.runExec()
        ipcRenderer.send('creat-break-window', this.breakType)
      }
    },

    runExec() {
      workerProcess = exec(cmdPath, { })

      workerProcess.stdout.on('data', function(data) {
        console.log('stdout: ' + data)
      })

      workerProcess.stderr.on('data', function(data) {
        console.log('stderr: ' + data)
      })

      workerProcess.on('close', function(code) {
        console.log('out code：' + code)
      })
    }
  },

  mounted() {
    EventBus.$on('ready-short-break', this.notifyShortBreak)
  },

  beforeDestroy() {
    EventBus.$off('ready-short-break', this.notifyShortBreak)
  }
}
</script>
