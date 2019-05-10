/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import { snapshotSectionKey, viewSnapshotSection } from '../view-snapshot-section'

const addPlugin = (plugins: any) => ({
  ...plugins,
})

describe('fromSnapshotSection', async assert => {
  const section1 = { prop: '1' }
  const section2 = { prop: '2' }

  assert({
    given: 'a config object',
    should: 'return the proper snapshot section',
    actual: viewSnapshotSection(
      addPlugin({
        [snapshotSectionKey]: section1,
      }),
    ),
    expected: section1,
  })

  assert({
    given: 'a config object',
    should: 'return an alternate snapshot section',
    actual: viewSnapshotSection(
      addPlugin({
        [snapshotSectionKey]: section2,
      }),
    ),
    expected: section2,
  })
})
