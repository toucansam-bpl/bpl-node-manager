import { Command } from '@oclif/command'
import { connect, disconnect, restart, } from 'pm2'


export class NodeRestartCommand extends Command {
  async run() {
    connect(err => {
      if (err) {
        console.log(err)
        process.exit(2)
      }

      restart('bpl-node', err => {
        disconnect()

        if (err) throw err
      })
    })
  }
}
