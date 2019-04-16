import { Command } from '@oclif/command'
import { connect, disconnect, stop, } from 'pm2'


export class NodeStopCommand extends Command {
  async run() {
    connect(err => {
      if (err) {
        console.log(err)
        process.exit(2)
      }

      stop('bpl-node', err => {
        disconnect()

        if (err) throw err
      })
    })
  }
}
