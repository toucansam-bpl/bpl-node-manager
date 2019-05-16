/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import { snapshotServersKey, viewSnapshotServers } from '../snapshot-servers'

describe('viewSnapshotServers', async assert => {
  assert({
    given: 'viewing snapshot servers property',
    should: 'return servers',
    actual: viewSnapshotServers({
      [snapshotServersKey]: ['server-1', 'server-2', 'server-3'],
    }),
    expected: ['server-1', 'server-2', 'server-3'],
  })

  assert({
    given: 'viewing snapshot servers property',
    should: 'return alternate servers',
    actual: viewSnapshotServers({ [snapshotServersKey]: ['alt-server-1', 'alt-server-2'] }),
    expected: ['alt-server-1', 'alt-server-2'],
  })
})
