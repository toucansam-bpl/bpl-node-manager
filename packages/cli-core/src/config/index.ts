import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import { resolve as resolvePath } from 'path'


const configDir = resolvePath(homedir(), '.blockpool')
const configFile = resolvePath(configDir, 'blockpool.config.json')


export function create() {
  const hasDirectory = directoryExists()

  if (!hasDirectory) {
    mkdirSync(configDir)
  }

  const configExists = fileExists()

  if (configExists) {
    throw new Error('Config file already exists. Will not be overwritten.')
  }

  const configData = {

  }
  writeFileSync(configFile, JSON.stringify(configData, null, 2))
}

function directoryExists() {
  return existsSync(configDir)
}

export function exists() {
  return directoryExists() && fileExists()
}

function fileExists() {
  return existsSync(configFile)
}

