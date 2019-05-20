import { readSnapshotServers } from '../config/snapshot-servers'

import showServerPrompt from './server-prompt'
import transformSnapshotUrl from './snapshot-url-transform'

export default () => {
  return Promise.resolve(readSnapshotServers())
    .then(showServerPrompt)
    .then(transformSnapshotUrl)
}
