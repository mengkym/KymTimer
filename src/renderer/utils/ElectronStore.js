import electron from 'electron'
import path from 'path'
import { dateFormat } from './DateFormat'

const Store = require('electron-store')
const app = electron.app || electron.remote.app

const option = {
  name: 'break-' + dateFormat('YYYY-mm-dd'),
  fileExtension: 'json',
  cwd: path.join(app.getPath('userData'), 'breaklogs'),
  clearInvalidConfig: true
}

const store = new Store(option)

export { store }
