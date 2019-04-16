import { Command } from '@oclif/command'
import fetch from 'node-fetch'

// {"success":true,"syncing":false,"blocks":322,"height":2830995,"id":"4340550761883183060"}
// {"success":true,"syncing":false,"blocks":-9,"height":2831347,"id":"16500256323577757008"}
// {"success":true,"syncing":false,"blocks":-20,"height":2831396,"id":"9154458450546454046"}

interface NodeSyncStatus {
  syncing: boolean,
  height: number,
}

async function getNodeSyncStatus(server: string) : Promise<NodeSyncStatus> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Fetching sync status for ${server}`)
      const raw = await fetch(`${server}/api/loader/status/sync`)
      const response = await raw.json()
      resolve(response)
    }
    catch (ex) {
      reject(ex)
    }
  })
}

interface NodeStatus {
  syncing: boolean,
  outOfSync: boolean,
}

async function getNodeStatus() : Promise<NodeStatus> {
  return new Promise(async (resolve, reject) => {
    let nodeHeight
    try {
      const nodeStatus = await getNodeSyncStatus('http://localhost:9030')

      if (nodeStatus.syncing) {
        return resolve({
          syncing: true,
          outOfSync: true,
        })
      }

      nodeHeight = nodeStatus.height
    }
    catch (ex) {
      if (ex.code === 'ECONNREFUSED') {
        // TODO: Warn that node is not running and suggest solution
        return reject(ex)
      } else {
        return reject(ex)
      }
    }

    try {
      const seed01Status = await getNodeSyncStatus('http://s01.mc.blockpool.io:9030')
      const heightDiff = seed01Status.height - nodeHeight

      console.log(`Height difference: ${heightDiff}`)
      resolve({
        syncing: false,
        // 40 blocks is at least a 10 minute time differential
        outOfSync: heightDiff > 40,
      })
    }
    catch (ex) {
      reject(ex)
    }
  })
}

export class MonitorRunCommand extends Command {
  async run() {
    try {
      console.log('Monitoring BPL Node status.')
      const status = await getNodeStatus()

      if (!status.syncing && status.outOfSync) {
        console.log('Node out of sync. Running hook.')
        await this.config.runHook('node-out-of-sync', {})
      }
    }
    catch (ex) {
    /*
      if (ex.code) {
        await this.config.runHook('node-out-of-sync', { id: 'out of sync' })
      }
    */
      throw ex
    }
  }
}
