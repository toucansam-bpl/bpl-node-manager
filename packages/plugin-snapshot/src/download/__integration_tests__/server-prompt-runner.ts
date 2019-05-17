/* tslint:disable:no-floating-promises */
import { writeMessage } from '../../cli-testing'
import serverPrompt from '../server-prompt'

const runServerPrompt = async () => {
  try {
    writeMessage(await serverPrompt(['server 1']))
  } catch (ex) {
    throw ex
  }
}
runServerPrompt()
