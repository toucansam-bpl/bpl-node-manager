/* tslint:disable:no-floating-promises */
import { describe, Try } from 'riteway'

import generateSnapshotFilename from '../snapshot-file-name-generator'

describe('snapshot file name generator', async assert => {
  assert({
    given: 'when given a snapshot url and an object with a date',
    should: 'generate a proper snapshot filename',
    actual: generateSnapshotFilename({
      currentDatetime: new Date(Date.UTC(2019, 5, 12, 12, 15)),
      snapshotUrl: 'https://snapshots.blockpool.io/current',
    }),
    expected: 'blockpool-io-201905121215',
  })

  assert({
    given: 'when given an alternate snapshot url and an object with a different date',
    should: 'generate an alternate proper snapshot filename',
    actual: generateSnapshotFilename({
      currentDatetime: new Date(Date.UTC(2019, 6, 25, 7, 30)),
      snapshotUrl: 'http://bplsnap.cryptooz.com/current',
    }),
    expected: 'cryptooz-com-201906250730',
  })

  assert({
    given: 'when a poorly formed url is provided',
    should: 'throw',
    actual: Try(generateSnapshotFilename, {
      currentDatetime: new Date(),
      snapshotUrl: 'not a url',
    }),
    expected: new Error(),
  })
})
