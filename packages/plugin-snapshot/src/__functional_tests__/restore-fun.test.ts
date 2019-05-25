/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import { onNextStdout, parseCommand, runCommand, typeEnter } from '../cli-testing'

describe('restore command', async assert => {
  await Promise.resolve(parseCommand('bpl snapshot:restore'))
    .then(runCommand)
    .then(
      onNextStdout(stdout => {
        assert({
          given: 'restore command was initiated',
          should: 'display the proper prompt text',
          actual: stdout.indexOf('Choose a snapshot to restore') !== -1,
          expected: true,
        })
      }),
    )
    .then(typeEnter)
})
