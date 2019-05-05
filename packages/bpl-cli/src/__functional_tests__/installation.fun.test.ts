/* tslint:disable:no-floating-promises */
import { existsSync } from 'fs'
import { describe } from 'riteway'
import { configDir, configFile } from '@toucansam-bpl/cli-core/lib/config'

describe('bpl cli', async assert => {
  assert({
    given: 'after being installed',
    should: `should add default config directory (${configDir})`,
    actual: existsSync(configDir),
    expected: true,
  })

  assert({
    given: 'after being installed',
    should: `create default config file (${configFile})`,
    actual: existsSync(configFile),
    expected: true,
  })
})
