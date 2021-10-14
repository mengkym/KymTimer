import electron from 'electron'
import os from 'os'
import path from 'path'
import winston from 'winston'
require('winston-daily-rotate-file')

const app = electron.app || electron.remote.app
app.setAppLogsPath(path.join(app.getPath('userData'), 'logs'))
const userDataPath = app.getPath('logs')
const jsonWithTimestamp = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
)

const logger = winston.createLogger({
  defaultMeta: { hostname: os.hostname() },
  format: jsonWithTimestamp,
  transports: [
    new winston.transports.File({
      filename: path.join(userDataPath, 'pomotroid-error.log'),
      level: 'error',
      maxsize: 1000
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(userDataPath, 'pomotroid-%DATE%.log'),
      maxFiles: '14d',
      maxSize: '20m'
    })
  ]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
    level: 'debug'
  }))
}

export { logger }
