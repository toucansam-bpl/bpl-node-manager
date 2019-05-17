/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import { ignoreStdout, parseCommand, readMessage, runCommand, typeEnter } from '../../cli-testing'

describe('server prompt', async assert => {
  await Promise.resolve(parseCommand(`node ${__dirname}/server-prompt-runner.js`))
    .then(runCommand)
    .then(async cli => {
      const stdout = await cli.stdout.next().value

      assert({
        given: 'server prompt was executed with single option',
        should: 'list that option',
        actual: stdout.indexOf('server 1') !== -1,
        expected: true,
      })

      return cli
    })
    .then(ignoreStdout)
    .then(typeEnter)
    .then(ignoreStdout)
    .then(ignoreStdout)
    .then(ignoreStdout)
    .then(ignoreStdout)
    .then(async cli => {
      const promptResult = await readMessage(cli)

      assert({
        given: 'a snapshot server was selected',
        should: 'return the snapshot server',
        actual: promptResult.selectedServer,
        expected: 'server 1',
      })

      return cli
    })
})
