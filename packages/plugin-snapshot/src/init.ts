import { config } from '@toucansam-bpl/cli-core'
import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export const snapshotDir = resolve(config.configDir, 'snapshots')

export const createConfigItems = () => {
  if (!existsSync(snapshotDir)) {
    mkdirSync(snapshotDir)
  }

  config.ensureSection({
    name: 'plugin-snapshot',
    snapshotDir,
  })
}
