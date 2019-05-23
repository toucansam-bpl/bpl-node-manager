import { promises } from 'fs'

const { readdir } = promises

export default (snapshotDir: string) => {
  return readdir(snapshotDir)
}
