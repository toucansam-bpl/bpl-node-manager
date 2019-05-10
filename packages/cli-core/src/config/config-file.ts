import { readFileSync } from 'fs'
import { pipe } from 'ramda'

import { configFile } from '../config'

export const readConfigFile = () => {
  return readFileSync(configFile).toString()
}

export const readConfigJson = pipe(
  readConfigFile,
  JSON.parse,
)
