/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import {
  ignoreStdout,
  onNextStdout,
  parseCommand,
  readMessage,
  runCommand,
  typeDownArrow,
  typeEnter,
} from '../../cli-testing'

describe('choose snapshot prompt', async assert => {
  await Promise.resolve(parseCommand(`node ${__dirname}/choose-snapshot-prompt-runner.js`))
    .then(runCommand)
    .then(
      onNextStdout(stdout => {
        assert({
          given: 'when executed with two snapshots',
          should: 'display the prompt',
          actual: stdout.indexOf('Choose a snapshot to restore') !== -1,
          expected: true,
        })

        assert({
          given: 'when executed with two snapshots',
          should: 'list the first snapshot',
          actual: stdout.indexOf('fake-snapshot-01') !== -1,
          expected: true,
        })

        assert({
          given: 'when executed with two snapshots',
          should: 'list the second snapshot',
          actual: stdout.indexOf('fake-snapshot-02') !== -1,
          expected: true,
        })
      }),
    )
    .then(typeDownArrow)
    .then(ignoreStdout)
    .then(typeEnter)
    .then(ignoreStdout)
    .then(
      readMessage(selectedSnapshot => {
        assert({
          given: 'a snapshot was selected',
          should: 'should return the snapshot name',
          actual: selectedSnapshot,
          expected: 'fake-snapshot-02',
        })
      }),
    )
})
