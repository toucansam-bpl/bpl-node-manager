import { spawn } from 'child_process'
import { resolve } from 'path'


export default function runLogs(processName: string, lines: number | undefined) {
  const pm2Path = resolve(__dirname, '..', '..', 'node_modules', 'pm2', 'bin', 'pm2')
  const commandArgs = ['logs', processName]
  const flagArgs = lines ? ['--lines', lines.toString()] : []

  spawn(pm2Path, commandArgs.concat(flagArgs), { stdio: 'inherit' })
}
