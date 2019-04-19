import { config } from '@toucansam-bpl/cli-core'

console.log('Running init file')

console.log('checking for existing config file')
if (config.exists()) {
  console.log('config exists - exiting.')
} else {
  console.log('creating config file')
  config.create()
  console.log('config file created')
}
