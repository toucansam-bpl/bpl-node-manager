import { readPlugins } from '@toucansam-bpl/cli-core/lib/config/view-plugins'
import { lensProp, pipe, view } from 'ramda'

import { viewSnapshotSection } from './snapshot-section'

export const snapshotDirKey = 'snapshotDir'
export const viewSnapshotDir = view(lensProp(snapshotDirKey))
export const readSnapshotDir = pipe(
  readPlugins,
  viewSnapshotSection,
  viewSnapshotDir,
)
