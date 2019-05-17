/* tslint:disable:align */
/* tslint:disable:whitespace */
/* tslint:disable:space-before-function-paren */
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { curry } from 'ramda'

interface RunningProcess {
  stdout: Iterator<Promise<string>>
  stdin(text: string): void
}

export const enterKey = '\x0D'
export const downArrow = '\x1B\x5B\x42'
export const upArrow = '\x1B\x5B\x41'

export const parseCommand = (commandText: string) => {
  let command: string
  let rest: string[]
  ;[command, ...rest] = commandText.split(' ')
  return {
    command,
    args: rest,
  }
}

export const commandStdout = function*(prompt: ChildProcessWithoutNullStreams) {
  let isRunning = true
  let receivedData: Promise<string>[] = []
  let awaitingData = (data: string) => {
    receivedData = [...receivedData, Promise.resolve(data)]
  }
  let performReject = (err: Error) => console.log(err)
  prompt.on('error', err => performReject(err))
  prompt.on('exit', () => (isRunning = false))
  prompt.stdout.on('data', data => {
    awaitingData(data.toString())
  })
  while (isRunning || receivedData.length > 0) {
    let first: Promise<string>
    ;[first, ...receivedData] = receivedData
    yield first ||
      new Promise<string>((resolve, reject) => {
        performReject = (err: Error) => reject(err)
        awaitingData = ((originalAwaitingData: (data: string) => void) => {
          return (data: string) => {
            awaitingData = originalAwaitingData
            resolve(data)
          }
        })(awaitingData)
      })
  }
}

export const runCommand = (commandObj: { command: string; args: string[] }) => {
  const prompt = spawn(commandObj.command, commandObj.args)
  const stdout = commandStdout(prompt)
  return {
    stdin: (text: string) => prompt.stdin.write(text),
    stdout,
  }
}

export const ignoreStdout = async (cli: RunningProcess) => {
  console.log('ignoring: ', await readStdout(cli))
  return cli
}

export const extractMessage = (text: string) => {
  const match = text.match(/CLI MESSAGE: ##(.*)##/i)
  return match === null ? '{}' : match[1]
}

export const readMessage = async (cli: RunningProcess) => {
  return readStdout(cli)
    .then(extractMessage)
    .then(JSON.parse)
    .catch(ex => console.log(ex))
}

export const readStdout = async (cli: RunningProcess) => {
  return cli.stdout.next().value
}

export const typeText = curry((text: string, cli: RunningProcess) => {
  cli.stdin(text)
  return cli
})

export const typeDownArrow = typeText(downArrow)
export const typeEnter = typeText(enterKey)
export const typeUpArrow = typeText(upArrow)

export const writeMessage = (message: {}) => {
  console.log(`CLI MESSAGE: ##${JSON.stringify(message)}##`)
}
