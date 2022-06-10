import electron from 'electron'
import path from 'path'
import * as d3 from 'd3'
// import { dateFormat } from './DateFormat'

const Store = require('electron-store')
const app = electron.app || electron.remote.app

const option = {
  name: 'breaklog',
  fileExtension: 'json',
  cwd: path.join(app.getPath('userData'), 'breaklogs'),
  clearInvalidConfig: true
}

const store = new Store(option)

store.getAll = function() {
  return store.get('items') || []
}

store.getYear = function() {
  const arr = store.get('items') || []
  return arr.reduce((obj, item) => ({
    ...obj,
    [item.time]: item.fulfill
  }), {})
}

store.getDay = function(day) {
  const arr = store.get('items') || []
  const start = d3.timeDay(day).getTime() / 1000
  const end = (d3.timeDay(day).getTime() + 24 * 3600 * 1000) / 1000
  const res = arr.filter(item => item.time >= start && item.time <= end)
  return res
}

store.pushItem = function(total, fulfill) {
  const history = store.getAll()
  history.push({ time: Math.round(new Date() / 1000), total, fulfill })
  store.set('items', history)
}

export { store }
