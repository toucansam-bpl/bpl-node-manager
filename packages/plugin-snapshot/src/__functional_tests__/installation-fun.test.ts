/* tslint:disable:no-floating-promises */
import { existsSync } from 'fs'
import { describe } from 'riteway'

import { defaultSnapshotDir } from '../init'
import { readSnapshotDir } from '../config/snapshot-dir'

describe('bpl snapshot plugin', async assert => {
  assert({
    given: 'after being installed',
    should: 'should add default snapshot directory to config section',
    actual: readSnapshotDir(),
    expected: defaultSnapshotDir,
  })

  assert({
    given: 'after being installed',
    should: `create snapshot directory (${defaultSnapshotDir})`,
    actual: existsSync(defaultSnapshotDir),
    expected: true,
  })
})
