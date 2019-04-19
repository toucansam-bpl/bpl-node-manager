import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

import { config } from '@toucansam-bpl/cli-core'

const snapshotDir = resolve(config.configDir, 'snapshots')

if (!existsSync(snapshotDir)) {
  mkdirSync(snapshotDir)
}

config.ensureSection({
  name: 'plugin-snapshot',
  snapshotDir,
})
