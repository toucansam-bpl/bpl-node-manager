import { spawn } from 'child_process'
import { existsSync as rawExists } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

const exists = promisify(rawExists)

function runPm2LogsCommand(pm2path: string, processName: string, lines: number | undefined) {
  const commandArgs = ['logs', processName]
  const flagArgs = lines ? ['--lines', lines.toString()] : []

  spawn(pm2path, commandArgs.concat(flagArgs), { stdio: 'inherit' })
}

export default async function runLogs(processName: string, lines: number | undefined) {
  return new Promise(async (success, reject) => {
    try {
      const localPm2Path = resolve(__dirname, '..', 'node_modules', 'pm2', 'bin', 'pm2')
      const localPm2Exists = await exists(localPm2Path)
      if (localPm2Exists) {
        await runPm2LogsCommand(localPm2Path, processName, lines)
        return success()
      }

      const topLevelPm2Path = resolve(__dirname, '..', '..', '..', 'pm2', 'bin', 'pm2')
      const topLevelPm2Exists = await exists(topLevelPm2Path)
      if (topLevelPm2Exists) {
        await runPm2LogsCommand(topLevelPm2Path, processName, lines)
        return success()
      }

      reject(new Error('Could not find module pm2 installed.'))
    } catch (ex) {
      reject(ex)
    }
  })
}
