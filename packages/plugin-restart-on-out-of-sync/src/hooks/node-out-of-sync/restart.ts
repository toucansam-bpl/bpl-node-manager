import { connect, disconnect, restart, } from 'pm2'


export default async function hook() {
  console.log('Restarting BPL Node')

  connect(err => {
    if (err) {
      console.log(err)
      process.exit(2)
    }

    restart('bpl-node', err => {
      disconnect()

      if (err) throw err
    })
  })
}
