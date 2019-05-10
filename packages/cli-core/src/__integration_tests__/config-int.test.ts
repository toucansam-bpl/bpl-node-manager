/* tslint:disable:no-floating-promises */
import { existsSync, promises } from 'fs'
import { describe } from 'riteway'

import { configDir, configFile, create } from '../config'

const { rmdir, unlink } = promises

describe('config', async assert => {
  await create()

  assert({
    given: 'after creating new config',
    should: `have default config directory present (${configDir})`,
    actual: existsSync(configDir),
    expected: true,
  })

  assert({
    given: 'after creating new config',
    should: `have default config file present (${configFile})`,
    actual: existsSync(configFile),
    expected: true,
  })

  await unlink(configFile)
  await rmdir(configDir)
})
