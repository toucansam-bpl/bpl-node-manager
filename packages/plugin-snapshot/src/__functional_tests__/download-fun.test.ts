/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import { parseCommand, runCommand, typeEnter } from '../cli-testing'

describe('download command', async assert => {
  await Promise.resolve(parseCommand('bpl snapshot:download'))
    .then(runCommand)
    .then(async cli => {
      const stdout = await cli.stdout.next().value

      assert({
        given: 'download command was initiated',
        should: 'list blockpool server',
        actual: stdout.indexOf('https://snapshots.blockpool.io') !== -1,
        expected: true,
      })

      assert({
        given: 'download command was initiated',
        should: 'list cryptooz server',
        actual: stdout.indexOf('http://bplsnap.cryptooz.com') !== -1,
        expected: true,
      })

      return cli
    })
    .then(typeEnter)
    .then(async cli => {
      const stdout = await cli.stdout.next().value

      assert({
        given: 'a snapshot server was selected',
        should: 'display downloading progress bar',
        actual: stdout.indexOf('Downloading snapshot from ') !== -1,
        expected: true,
      })

      return cli
    })
    .then(async cli => {
      const stdout = await cli.stdout.next().value

      assert({
        given: 'when given an object with a url',
        should: 'add a generated filename',
        actual: /blockpool-io-\d{12}$/.test(stdout),
        expected: true,
      })

      return cli
    })
    .catch((err: Error) => console.log(err))
})
