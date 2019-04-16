import { Command } from '@oclif/command'
import { flags } from '@oclif/parser'

import runLog from '../../runLog'


export class NodeLogsCommand extends Command {
  static flags = {
    lines: flags.integer(),
  }

  async run() {
    const { flags } = this.parse(NodeLogsCommand)
    runLog('bpl-node', flags.lines)
  }
}
