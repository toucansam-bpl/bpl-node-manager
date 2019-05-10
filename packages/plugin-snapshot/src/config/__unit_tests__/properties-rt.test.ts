/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import { viewSnapshotDir } from '../properties'

describe('properties', async assert => {
  assert({
    given: 'viewing snapshotDir property',
    should: 'return proper value',
    actual: viewSnapshotDir({ snapshotDir: 'directory_name' }),
    expected: 'directory_name',
  })

  assert({
    given: 'viewing snapshotDir property',
    should: 'return alternate value',
    actual: viewSnapshotDir({ snapshotDir: 'directory_name_2' }),
    expected: 'directory_name_2',
  })
})
