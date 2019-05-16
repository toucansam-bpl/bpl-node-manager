import { Command } from '@oclif/command'

import downloadProcess from '../../download/download-process'

export class SnapshotDownloadCommand extends Command {
  async run() {
    downloadProcess()
  }
}
