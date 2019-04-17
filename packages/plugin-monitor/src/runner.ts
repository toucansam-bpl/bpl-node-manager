import { spawn } from 'child_process'
const fifteenMinutes = 15 * 60 * 1000

console.log(`Starting BPL node monitor...`)

async function checkNodeStatus() {
  spawn('bpl', ['monitor:run'], { stdio: 'inherit' })
}

setInterval(() => checkNodeStatus(), fifteenMinutes)

console.log(`BPL node monitor started.`)

checkNodeStatus()
