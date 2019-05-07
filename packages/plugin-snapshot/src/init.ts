import { config } from '@toucansam-bpl/cli-core'
import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const snapshotDir = resolve(config.configDir, 'snapshots')

export default function createConfigItems() {
  if (!existsSync(snapshotDir)) {
    mkdirSync(snapshotDir)
  }

  config.ensureSection({
    name: 'plugin-snapshot',
    snapshotDir,
  })
}
