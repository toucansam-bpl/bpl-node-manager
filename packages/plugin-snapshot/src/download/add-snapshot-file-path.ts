import { resolve } from 'path'

import { readSnapshotDir } from '../config/snapshot-dir'

import generateSnapshotFilename from './snapshot-file-name-generator'

export default (url: string) => {
  const outputPath = resolve(
    readSnapshotDir(),
    generateSnapshotFilename({
      currentDatetime: new Date(),
      snapshotUrl: url,
    }),
  )
  return {
    outputPath,
    url,
  }
}
