import { config } from '@toucansam-bpl/cli-core'
import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

import { snapshotDirKey } from './config/snapshot-dir'
import { snapshotSectionKey } from './config/snapshot-section'
import { snapshotServersKey } from './config/snapshot-servers'

export const defaultSnapshotDir = resolve(config.configDir, 'snapshots')
export const defaultSnapshotServers = [
  'https://snapshots.blockpool.io',
  'http://bplsnap.cryptooz.com',
]

export const createConfigItems = () => {
  if (!existsSync(defaultSnapshotDir)) {
    mkdirSync(defaultSnapshotDir)
  }

  config.ensureSection({
    name: snapshotSectionKey,
    [snapshotDirKey]: defaultSnapshotDir,
    [snapshotServersKey]: defaultSnapshotServers,
  })
}
