import { connect, disconnect, restart } from 'pm2'

export default async function hook({ plugin }) {
  console.log('installing config', plugin)
}
