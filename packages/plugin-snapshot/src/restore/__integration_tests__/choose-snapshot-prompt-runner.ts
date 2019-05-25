/* tslint:disable:no-floating-promises */
import { writeMessage } from '../../cli-testing'
import chooseSnapshotPrompt from '../choose-snapshot-prompt'

const runCli = async () => {
  try {
    writeMessage(await chooseSnapshotPrompt(['fake-snapshot-01', 'fake-snapshot-02']))
  } catch (ex) {
    throw ex
  }
}
runCli()
