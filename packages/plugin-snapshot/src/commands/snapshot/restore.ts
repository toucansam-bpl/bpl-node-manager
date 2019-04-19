import { Command } from '@oclif/command'
import { prompt } from 'inquirer'
import { homedir } from 'os'
import { resolve } from 'path'


const defaultConfigDir = resolve(homedir(), '.blockpool')
const downloadedSnapshotDir = resolve(homedir(), 'snapshots')
const defaultSnapshotDir = resolve(defaultConfigDir, 'snapshot', 'snapshots')
// dropdb bpl_mainnet
// createdb bpl_mainnet

// pg_dump -O bpl_mainnet -Fc -Z6 > ~/snapshots/snapshot_1234567~
// pg_restore -O -j 8 -d bpl_mainnet ~/snapshot_0-2787549


export class SnapshotRestoreCommand extends Command {
  async run() {
    prompt({
      type: 'list',
      name: 'snapshot_location',
      message: 'snapshots location?',
      choices: [`<HOME>/.blockpool/snapshots`, `<HOME>/snapshots`]
    }).then(val => {
      console.log(`Value: ${val}`)
      prompt({
        type: 'list',
        name: 'snapshot_file',
        message: 'Which snapshot would you like to restore?',
        choices: [`snap 1`, `snap 2`]
      })
    })
  }
}
