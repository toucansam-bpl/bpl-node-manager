/* tslint:disable:no-floating-promises */
import { existsSync } from 'fs'
import { describe } from 'riteway'

import { configDir, configFile } from '../config'
// import { rmdir, unlink } from '../util/fs-promise'

describe('config', async assert => {
  // await create()

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

  // await unlink(configFile)
  // await rmdir(configDir)
})
