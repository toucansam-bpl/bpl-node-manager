/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import transformSnapshotUrl from '../snapshot-url-transform'

describe('snapshot url transform', async assert => {
  assert({
    given: 'when transforming a snapshot url',
    should: 'append /current',
    actual: transformSnapshotUrl('http://snapshot.com'),
    expected: 'http://snapshot.com/current',
  })
})
