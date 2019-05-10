import * as execa from 'execa'
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

import { configDir } from '../packages/cli-core/lib/config'

interface Package {
  json: string
  localTarballFile: string
  packageDirectoryName: string
  packageDirectoryPath: string
  packageJsonFile: string
  packageName: string
  tarballFile: string
  tarballName: string
  version: string
}

const packagesDir = resolve(__dirname, '..', 'packages')
const localTarballDir = resolve(__dirname, 'packed')

mkdirSync(localTarballDir)

const packages = readdirSync(packagesDir).reduce<Package[]>((all, packageDirectoryName) => {
  const packageDirectoryPath = resolve(packagesDir, packageDirectoryName)
  const packageJsonFile = resolve(packageDirectoryPath, 'package.json')
  const json = readFileSync(packageJsonFile).toString()
  const info = JSON.parse(json)
  const { name: packageName, version } = info
  const tarballName = `${packageName.replace('@', '').replace('/', '-')}-${version}.tgz`
  return all.concat([
    {
      json,
      localTarballFile: resolve(localTarballDir, tarballName),
      packageDirectoryName,
      packageDirectoryPath,
      packageJsonFile,
      packageName,
      tarballFile: resolve(packageDirectoryPath, tarballName),
      tarballName,
      version,
    },
  ])
}, [])

packages.forEach(packageInfo => {
  const updatedJson = packages.reduce<string>((packageJson, p) => {
    return packageJson.replace(`file:../${p.packageDirectoryName}`, p.localTarballFile)
  }, packageInfo.json)

  writeFileSync(packageInfo.packageJsonFile, updatedJson)

  try {
    execa.shellSync('npm pack', {
      cwd: packageInfo.packageDirectoryPath,
      stdio: 'inherit',
    })
  } catch (ex) {
    console.log('npm pack failed with error: ', ex)
  }

  writeFileSync(packageInfo.packageJsonFile, packageInfo.json)
  execa.shellSync(`mv ${packageInfo.tarballFile} ${packageInfo.localTarballFile}`)
})

process.env.OCLIF_DEBUG = '1'

packages
  .filter(p => p.packageName === 'bpl-cli')
  .forEach(p => {
    execa.shellSync(`npm install -g ${p.localTarballFile}`, { stdio: 'inherit' })
    execa.shellSync('npm run test:functional', {
      cwd: p.packageDirectoryPath,
      stdio: 'inherit',
    })
  })

packages
  .filter(p => p.packageName.indexOf('plugin') !== -1)
  .forEach(p => {
    execa.shellSync(`env DEBUG=\* bpl plugins:install file:${p.localTarballFile}`, {
      stdio: 'inherit',
    })
    execa.shellSync(`ls ${configDir}`, { stdio: 'inherit' })
    execa.shellSync('npm run test:functional', {
      cwd: p.packageDirectoryPath,
      stdio: 'inherit',
    })
    execa.shellSync(`ls ${configDir}`, { stdio: 'inherit' })
    execa.shellSync(`bpl plugins:uninstall ${p.packageDirectoryName.replace('plugin-', '')}`, {
      stdio: 'inherit',
    })
  })

execa.shellSync(`rm -Rf ${localTarballDir}`)
process.env.OCLIF_DEBUG = '0'
