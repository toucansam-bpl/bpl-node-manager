import { Command } from '@oclif/command'
import { flags } from '@oclif/parser'

import runLog from '../../run-log'

export class NodeLogsCommand extends Command {
  static flags = {
    lines: flags.integer(),
  }

  async run() {
    const { flags } = this.parse(NodeLogsCommand)
    runLog('bpl-node', flags.lines).catch(ex => console.log(ex))
  }
}
