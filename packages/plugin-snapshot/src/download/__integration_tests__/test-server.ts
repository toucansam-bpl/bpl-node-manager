import { createReadStream } from 'fs'
import { createServer, Server } from 'http'
import { resolve } from 'path'

let server: Server

export const start = (directory: string, port: number) => {
  server = createServer((req, res) => {
    if (!req.url) {
      res.writeHead(404)
      res.end()
      return
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    createReadStream(resolve(directory, `${req.url.replace('/', '')}.txt`)).pipe(res)
  }).listen(port)
}

export const stop = () => {
  server.close()
}
