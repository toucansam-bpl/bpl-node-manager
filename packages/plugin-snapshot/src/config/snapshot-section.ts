import { lensProp, view } from 'ramda'

export const snapshotSectionKey = 'snapshot'
export const viewSnapshotSection = view(lensProp(snapshotSectionKey))
