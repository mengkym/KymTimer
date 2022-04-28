import electron from 'electron'
import path from 'path'
import { dateFormat } from './DateFormat'

const Store = require('electron-store')
const app = electron.app || electron.remote.app

const option = {
  name: 'day-' + dateFormat('YYYY-mm-dd'),
  fileExtension: 'json',
  cwd: path.join(app.getPath('userData'), 'breaklogs'),
  clearInvalidConfig: true
}

const store = new Store(option)

store.getAll = function() {
  return store.get('items') || []
}

store.pushItem = function(total, fulfill) {
  const history = store.getAll()
  history.push({ time: dateFormat('HH-MM-ss'), total, fulfill })
  store.set('items', history)
}

export { store }
