/* tslint:disable:no-floating-promises */
import { promises } from 'fs'
import { describe } from 'riteway'

import { configDir, configFile } from '../../config'
import { readConfigFile } from '../config-file'

const { mkdir, rmdir, unlink, writeFile } = promises

describe('config-file', async assert => {
  await mkdir(configDir)
  await writeFile(configFile, 'test contents 1')

  assert({
    given: 'when reading the config file',
    should: 'get file contents',
    actual: readConfigFile(),
    expected: 'test contents 1',
  })

  await unlink(configFile)

  await writeFile(configFile, 'test contents 2')

  assert({
    given: 'when reading the config file',
    should: 'get different contents',
    actual: readConfigFile(),
    expected: 'test contents 2',
  })

  await unlink(configFile)
  await rmdir(configDir)
})
