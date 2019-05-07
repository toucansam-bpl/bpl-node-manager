/* tslint:disable:no-floating-promises */
import { existsSync } from 'fs'
import { describe } from 'riteway'

import { snapshotDir } from '../init'

describe('bpl snapshot plugin', async assert => {
  assert({
    given: 'after being installed',
    should: 'should add default snapshot directory to config section',
    actual: existsSync(snapshotDir),
    expected: true,
  })

  assert({
    given: 'after being installed',
    should: `create snapshot directory (${snapshotDir})`,
    actual: existsSync(snapshotDir),
    expected: true,
  })
})
