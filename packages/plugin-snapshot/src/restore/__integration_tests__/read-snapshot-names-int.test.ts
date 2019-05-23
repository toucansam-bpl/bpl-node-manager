/* tslint:disable:no-floating-promises */
import { promises } from 'fs'
import { resolve } from 'path'
import { describe } from 'riteway'

import readSnapshotNames from '../read-snapshot-names'

const { mkdir, rmdir, unlink, writeFile } = promises

describe('read snapshot names', async assert => {
  const fakeSnapshotDir = resolve(__dirname, 'fake-snapshots')
  const fakeSnapshotFile1 = resolve(fakeSnapshotDir, 'fake-snapshot-1')
  const fakeSnapshotFile2 = resolve(fakeSnapshotDir, 'fake-snapshot-2')

  await mkdir(fakeSnapshotDir)

  await writeFile(fakeSnapshotFile1, 'irrelevant')
  await writeFile(fakeSnapshotFile2, 'irrelevant')

  assert({
    given: 'when supplied with a directory',
    should: 'should return the snapshot names',
    actual: await readSnapshotNames(fakeSnapshotDir),
    expected: ['fake-snapshot-1', 'fake-snapshot-2'],
  })

  await unlink(fakeSnapshotFile1)
  await unlink(fakeSnapshotFile2)

  const fakeSnapshotFile3 = resolve(fakeSnapshotDir, 'fake-snapshot-3')
  const fakeSnapshotFile4 = resolve(fakeSnapshotDir, 'fake-snapshot-4')
  const fakeSnapshotFile5 = resolve(fakeSnapshotDir, 'fake-snapshot-5')

  await writeFile(fakeSnapshotFile3, 'irrelevant')
  await writeFile(fakeSnapshotFile4, 'irrelevant')
  await writeFile(fakeSnapshotFile5, 'irrelevant')

  assert({
    given: 'when supplied with a directory with different contents',
    should: 'should return the different snapshot names',
    actual: await readSnapshotNames(fakeSnapshotDir),
    expected: ['fake-snapshot-3', 'fake-snapshot-4', 'fake-snapshot-5'],
  })

  await unlink(fakeSnapshotFile3)
  await unlink(fakeSnapshotFile4)
  await unlink(fakeSnapshotFile5)

  await rmdir(fakeSnapshotDir)
})
