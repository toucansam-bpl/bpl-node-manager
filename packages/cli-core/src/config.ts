import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import { resolve as resolvePath } from 'path'

interface ConfigFile {
  sections: ConfigSection[]
}

export interface ConfigSection {
  name: string,
}

interface QueryResult<T> {
  hasItem: boolean;
  item: T | null;
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
    sections: [],
  })
}

function directoryExists() {
  return existsSync(configDir)
}

export function ensureSection(section: ConfigSection | any) {
  const existingSectionResult = queryForSection(section.name)
  
  const existingSection = existingSectionResult.hasItem ? existingSectionResult.item : {}

  saveSection({
    ... existingSection,
    ... section,
  })
}

export function exists() {
  return directoryExists() && fileExists()
}

function fileExists() {
  return existsSync(configFile)
}

function openConfig() : ConfigFile {
  const rawConfig = readFileSync(configFile).toString()
  const config = JSON.parse(rawConfig)
  return config
}

function queryForSection(sectionName: string) : QueryResult<ConfigSection> {
  const config = openConfig()
  const matchingSections = config.sections.filter(s => s.name === sectionName)
  const hasMatch = matchingSections.length === 1

  return {
    hasItem: hasMatch,
    item: hasMatch ? matchingSections[0] : null,
  }
}

function saveConfig(config: ConfigFile) {
  writeFileSync(configFile, JSON.stringify(config, null, 2))
}

function saveSection(section: ConfigSection) {
  const config = openConfig()
  const itemIndex = config.sections.findIndex(({ name }) => name === section.name)

  if (itemIndex === -1) {
    config.sections.push(section)
  } else {
    config.sections[itemIndex] = section
  }

  saveConfig(config)
}
