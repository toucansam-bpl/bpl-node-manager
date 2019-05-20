import { createWriteStream } from 'fs'
import fetch from 'node-fetch'

export default async (downloadOpts: { url: string; outputPath: string }) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const response = await fetch(downloadOpts.url)
      const fileWriter = createWriteStream(downloadOpts.outputPath).on('finish', () => {
        resolve(downloadOpts.outputPath)
      })
      response.body.pipe(fileWriter)
    } catch (ex) {
      reject(ex)
    }
  })
}
