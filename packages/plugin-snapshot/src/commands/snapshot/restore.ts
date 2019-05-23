/* tslint:disable:no-floating-promises */
import { Command } from '@oclif/command'

import restoreProcess from '../../restore/restore-process'

export class SnapshotRestoreCommand extends Command {
  async run() {
    restoreProcess()
  }
}
