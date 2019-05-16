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
  prompt.on('exit', () => (isRunning = false))
  while (isRunning) {
    const stdout = new Promise<string>((resolve, reject) => {
      prompt.stdout.once('data', data => resolve(data.toString()))
      prompt.stderr.once('data', data => reject(data.toString()))
    })
    yield stdout
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

export const typeText = curry((text: string, cli: RunningProcess) => {
  cli.stdin(text)
  return cli
})

export const ignoreStdout = async (cli: RunningProcess) => {
  await cli.stdout.next().value
  return cli
}

export const logStdout = async (cli: RunningProcess) => {
  const stdout = await cli.stdout.next().value
  console.log(stdout)
  return cli
}

export const typeDownArrow = typeText(downArrow)
export const typeEnter = typeText(enterKey)
export const typeUpArrow = typeText(upArrow)
