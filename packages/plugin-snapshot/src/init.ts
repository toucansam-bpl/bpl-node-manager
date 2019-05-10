import { config } from '@toucansam-bpl/cli-core'
import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

import { snapshotSectionKey } from './config/snapshot-section'

export const defaultSnapshotDir = resolve(config.configDir, 'snapshots')

export const createConfigItems = () => {
  if (!existsSync(defaultSnapshotDir)) {
    mkdirSync(defaultSnapshotDir)
  }

  config.ensureSection({
    name: snapshotSectionKey,
    snapshotDir: defaultSnapshotDir,
  })
}
