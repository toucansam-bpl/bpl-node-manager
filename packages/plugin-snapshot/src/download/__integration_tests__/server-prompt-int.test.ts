/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import {
  ignoreStdout,
  onNextStdout,
  parseCommand,
  readMessage,
  runCommand,
  typeEnter,
} from '../../cli-testing'

describe('server prompt', async assert => {
  await Promise.resolve(parseCommand(`node ${__dirname}/server-prompt-runner.js`))
    .then(runCommand)
    .then(
      onNextStdout(stdout => {
        assert({
          given: 'server prompt was executed with single option',
          should: 'list that option',
          actual: stdout.indexOf('server 1') !== -1,
          expected: true,
        })
      }),
    )
    .then(typeEnter)
    .then(ignoreStdout)
    .then(
      readMessage(selectedServer => {
        assert({
          given: 'a snapshot server was selected',
          should: 'return the snapshot server',
          actual: selectedServer,
          expected: 'server 1',
        })
      }),
    )
})
