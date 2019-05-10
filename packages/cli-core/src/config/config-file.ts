import { readFileSync, read } from 'fs'
import { pipe } from 'ramda'

import { configFile } from '../config'

export const readConfigFile = () => {
  return readFileSync(configFile).toString()
}

export const readConfigJson = () => {
  return pipe(
    readConfigFile,
    JSON.parse,
  )
}
