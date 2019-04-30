/* tslint:disable:no-floating-promises */
import { exists as existsWithCallback } from 'fs'
import * as execa from 'execa'
import { resolve } from 'path'
import { describe } from 'riteway'
import { promisify } from 'util'

const exists = promisify(existsWithCallback)

const runCommand = async (command = '', options = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const { stdout } = await execa.shell(command, options)
      resolve(stdout)
    } catch (ex) {
      reject(ex)
    }
  })

describe('bpl snapshot plugin', async assert => {
  await runCommand('bpl plugins:link .', {
    cwd: resolve(__dirname, '..', '..'),
  })

  assert({
    given: 'after being installed',
    should: 'should add default snapshot directory to config section',
    actual: await exists(resolve('~/.blockpool/snapshots')),
    expected: true,
  })

  assert({
    given: 'after being installed',
    should: 'create snapshot directory',
    actual: await exists(resolve('~/.blockpool/snapshots')),
    expected: true,
  })
})
