import { Command } from '@oclif/command'
import { flags } from '@oclif/parser'
import { exists as existsRaw } from 'fs'
import { homedir } from 'os'
import { resolve } from 'path'
import { connect, disconnect, start, } from 'pm2'
import { promisify } from 'util'

const exists = promisify(existsRaw)

export class NodeStartCommand extends Command {
  static flags = {
    "log-level": flags.string({
      default: 'debug',
      description: 'Log level for the bpl-node logs',
      options: ['debug', 'info', 'warn'],
      required: true,
    }),
    "node-dir": flags.string({
      default: resolve(homedir(), 'BPL-node'),
      description: 'Directory containing bpl-node code',
      required: true,
    })
  }

  async run() {
    const { flags } = this.parse(NodeStartCommand)

    const isBplNodeInstalled = await exists(flags["node-dir"])

    if (!isBplNodeInstalled) {
      this.error(`bpl-node is not installed in ${flags["node-dir"]}.`)
      return
    }

    connect(err => {
      if (err) {
        console.log(err)
        process.exit(2)
      }

      const mainnetArgs = ['--genesis', 'genesisBlock.mainnet.json', '--config', 'config.mainnet.json']
      const flagArgs = ['--log', flags["log-level"]]

      const nodeOptions = {
        args: mainnetArgs.concat(flagArgs),
        cwd: flags["node-dir"],
        name: 'bpl-node',
        script: 'app.js'
      }

      this.log(`bpl-node starting`)
      start(nodeOptions, (err, apps) => {
        disconnect()

        if (err) {
          this.warn(`bpl-node not started`)
          this.error(err)
        } else {
          this.log(`bpl-node started`)
        }
      })
    })
  }
}
