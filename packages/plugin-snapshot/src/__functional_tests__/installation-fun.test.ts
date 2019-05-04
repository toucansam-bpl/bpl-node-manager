/* tslint:disable:no-floating-promises */
import { existsSync } from 'fs'
import { resolve } from 'path'
import { describe } from 'riteway'

describe('bpl snapshot plugin', async assert => {
  assert({
    given: 'after being installed',
    should: 'should add default snapshot directory to config section',
    actual: existsSync(resolve('~/.blockpool/snapshots')),
    expected: true,
  })

  assert({
    given: 'after being installed',
    should: 'create snapshot directory',
    actual: existsSync(resolve('~/.blockpool/snapshots')),
    expected: true,
  })
})
