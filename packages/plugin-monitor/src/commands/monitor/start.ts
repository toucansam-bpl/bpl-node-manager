import { Command } from '@oclif/command'

import { connect, disconnect, start, } from 'pm2'

import config from '../../bpl-monitor.ecosystem.config'


export class MonitorStartCommand extends Command {
  async run() {
    connect(err => {
      if (err) {
        console.log(err)
        process.exit(2)
      }

      start(config, (err, apps) => {
        disconnect()

        if (err) throw err
      })
    })
  }
}
