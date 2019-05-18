import { pipe } from 'ramda'

import { readSnapshotServers } from '../config/snapshot-servers'

import showServerPrompt from './server-prompt'

export default pipe(
  readSnapshotServers,
  showServerPrompt,
)
