import { readSnapshotServers } from '../config/snapshot-servers'

import addSnapshotFilePath from './add-snapshot-file-path'
import downloadFile from './file-downloader'
import showServerPrompt from './server-prompt'
import transformSnapshotUrl from './snapshot-url-transform'

export default () => {
  return Promise.resolve(readSnapshotServers())
    .then(showServerPrompt)
    .then(transformSnapshotUrl)
    .then(addSnapshotFilePath)
    .then(downloadFile)
}
