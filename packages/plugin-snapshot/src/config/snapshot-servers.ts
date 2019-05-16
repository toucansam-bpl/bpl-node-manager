import { readPlugins } from '@toucansam-bpl/cli-core/lib/config/view-plugins'
import { lensProp, pipe, view } from 'ramda'

import { viewSnapshotSection } from './snapshot-section'

export const snapshotServersKey = 'servers'
export const viewSnapshotServers = view(lensProp(snapshotServersKey))
export const readSnapshotServers = pipe(
  readPlugins,
  viewSnapshotSection,
  viewSnapshotServers,
)
