import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import { resolve as resolvePath } from 'path'

interface ConfigFile {
  plugins: { [index: string]: ConfigSection }
}

export interface ConfigSection {
  name: string
}

interface QueryResult<T> {
  hasItem: boolean
  item: T | null
}

export const configDir = resolvePath(homedir(), '.blockpool')
export const configFile = resolvePath(configDir, 'blockpool.config.json')

export function create() {
  const hasDirectory = directoryExists()

  if (!hasDirectory) {
    mkdirSync(configDir)
  }

  const configExists = fileExists()

  if (configExists) {
    throw new Error('Config file already exists. Will not be overwritten.')
  }

  saveConfig({
    plugins: {},
  })
}

function directoryExists() {
  return existsSync(configDir)
}

export function ensureSection(section: ConfigSection | any) {
  const existingSectionResult = queryForSection(section.name)

  const existingSection = existingSectionResult.hasItem ? existingSectionResult.item : {}

  saveSection({
    ...existingSection,
    ...section,
  })
}

export function exists() {
  return directoryExists() && fileExists()
}

function fileExists() {
  return existsSync(configFile)
}

function openConfig(): ConfigFile {
  const rawConfig = readFileSync(configFile).toString()
  const config = JSON.parse(rawConfig)
  return config
}

function queryForSection(sectionName: string): QueryResult<ConfigSection> {
  const config = openConfig()
  const matchingSection = config.plugins[sectionName]
  const hasMatch = !!matchingSection

  return {
    hasItem: hasMatch,
    item: hasMatch ? matchingSection : null,
  }
}

function saveConfig(config: ConfigFile) {
  writeFileSync(configFile, JSON.stringify(config, null, 2))
}

function saveSection(section: ConfigSection) {
  const config = openConfig()
  const plugins = config.plugins

  saveConfig({
    ...config,

    plugins: {
      ...plugins,

      [section.name]: section,
    },
  })
}
