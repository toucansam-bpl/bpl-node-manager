import { Command } from '@oclif/command'
import { resolve } from 'path'
import { connect, disconnect, start, } from 'pm2'


export class MonitorStartCommand extends Command {
  async run() {
    connect(err => {
      if (err) {
        console.log(err)
        process.exit(2)
      }

      const monitorOptions = {
        cwd: resolve(__dirname, '..', '..'),
        exp_backoff_restart_delay: 100,
        name: 'bpl-monitor',
        script: 'runner.js'
      }

      start(monitorOptions, (err, apps) => {
        disconnect()

        if (err) throw err
      })
    })
  }
}
