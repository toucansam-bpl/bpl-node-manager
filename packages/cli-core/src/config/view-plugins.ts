import { lensProp, pipe, view } from 'ramda'

import { readConfigJson } from './config-file'

export const pluginsKey = 'plugins'
export const viewPlugins = view(lensProp(pluginsKey))

export const readPlugins = () => {
  return pipe(
    readConfigJson,
    viewPlugins,
  )
}
