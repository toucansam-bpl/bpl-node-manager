import * as execa from 'execa'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

interface Package {
  json: string
  packageDirectoryName: string
  packageDirectoryPath: string
  packageJsonFile: string
  packageName: string
  tarballFile: string
  tarballName: string
  version: string
}

const packagesDir = resolve(__dirname, '..', 'packages')
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
    const localRef = `file:../${p.packageDirectoryName}`
    const tarballLocalRef = resolve(__dirname, p.tarballName)
    return packageJson.replace(localRef, tarballLocalRef)
  }, packageInfo.json)

  writeFileSync(packageInfo.packageJsonFile, updatedJson)
  execa.shellSync('npm pack', {
    cwd: packageInfo.packageDirectoryPath,
    stdio: 'inherit',
  })
  writeFileSync(packageInfo.packageJsonFile, packageInfo.json)
  execa.shellSync(`mv ${packageInfo.tarballFile} ${resolve(__dirname, packageInfo.tarballName)}`)
})
