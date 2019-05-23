/* tslint:disable:no-floating-promises */
// import { readdirSync } from 'fs'
import { describe } from 'riteway'

import { ignoreStdout, onNextStdout, parseCommand, runCommand, typeEnter } from '../cli-testing'
// import { readSnapshotDir } from '../config/snapshot-dir'

describe('download command', async assert => {
  await Promise.resolve(parseCommand('bpl snapshot:download'))
    .then(runCommand)
    .then(
      onNextStdout(stdout => {
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
      }),
    )
    .then(typeEnter)
    .then(ignoreStdout)
    .then(
      onNextStdout(stdout => {
        assert({
          given: 'a snapshot server was selected',
          should: 'display downloading progress bar',
          actual: stdout.indexOf('https://snapshots.blockpool.io/current') !== -1,
          expected: true,
        })
      }),
    )
  /*
  The following tests *could* run, but will timeout, causing the build to fail.
  Fow now, it is unclear if downloading from a test server brings anything to the table.
    .then(
      onNextStdout(
        stdout => {
          assert({
            given: 'when snapshot download is complete',
            should: 'display "done"',
            actual: stdout.indexOf('done') !== -1,
            expected: true,
          })
        },
        stdout => stdout.indexOf('done') !== -1,
      ),
    )
    .then(
      onNextStdout(stdout => {
        assert({
          given: 'when snapshot download is complete',
          should: 'display snapshot path',
          actual: /blockpool-io-\d{12}$/.test(stdout),
          expected: true,
        })

        assert({
          given: 'when snapshot download is complete',
          should: 'have a file saved in the snapshot directory',
          actual: /blockpool-io-\d{12}$/.test(readdirSync(readSnapshotDir())[0]),
          expected: true,
        })
      }),
    )
*/
})
