/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import {
  ignoreStdout,
  onNextStdout,
  parseCommand,
  readMessage,
  runCommand,
} from '../../cli-testing'

describe('downloading indicator', async assert => {
  await Promise.resolve(parseCommand(`node ${__dirname}/downloading-indicator-runner.js`))
    .then(runCommand)
    .then(
      onNextStdout(stdout => {
        assert({
          given: 'downloading indicator was executed',
          should: 'display downloading progress message',
          actual: stdout,
          expected: 'Downloading snapshot from http://test.url...',
        })
      }),
    )
    .then(ignoreStdout)
    .then(
      readMessage(stdout => {
        assert({
          given: 'a snapshot server was selected',
          should: 'return the snapshot server',
          actual: stdout,
          expected: 'this/is/an/output/path',
        })
      }),
    )
})
