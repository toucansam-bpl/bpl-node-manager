import { Command } from '@oclif/command'
import { flags } from '@oclif/parser'

import runLog from '../../run-log'

export class MonitorLogsCommand extends Command {
  static flags = {
    lines: flags.integer(),
  }

  async run() {
    const { flags } = this.parse(MonitorLogsCommand)
    runLog('bpl-monitor', flags.lines).catch(ex => console.log(ex))
  }
}
