/* tslint:disable:no-floating-promises */
import { existsSync, promises } from 'fs'
import { resolve } from 'path'
import { describe } from 'riteway'

import downloadFile from '../file-downloader'

import { start, stop } from './test-server'

const { readFile, unlink, writeFile } = promises

describe('file downloader', async assert => {
  start(__dirname, 8080)

  const file1Path = resolve(__dirname, 'file1.txt')
  const file2Path = resolve(__dirname, 'file2.txt')

  try {
    await writeFile(file1Path, 'These are the file contents')
    await writeFile(file2Path, 'These are alternate file contents')

    const downloadedFile1Path = await downloadFile({
      url: 'http://localhost:8080/file1',
      outputPath: resolve(__dirname, 'file1-downloaded.txt'),
    })

    assert({
      given: 'after downloading a file',
      should: 'save the file in the proper path',
      actual: existsSync(downloadedFile1Path),
      expected: true,
    })

    assert({
      given: 'after downloading a file',
      should: 'save the file with the proper contents',
      actual: (await readFile(downloadedFile1Path)).toString(),
      expected: 'These are the file contents',
    })

    await unlink(downloadedFile1Path)

    const downloadedFile2Path = await downloadFile({
      url: 'http://localhost:8080/file2',
      outputPath: resolve(__dirname, 'file2-downloaded.txt'),
    })

    assert({
      given: 'after downloading an alternate file',
      should: 'save the file in the proper path',
      actual: existsSync(downloadedFile2Path),
      expected: true,
    })

    assert({
      given: 'after downloading an alternate file',
      should: 'save the file with the proper contents',
      actual: (await readFile(downloadedFile2Path)).toString(),
      expected: 'These are alternate file contents',
    })

    await unlink(downloadedFile2Path)
  } finally {
    await unlink(file1Path)
    await unlink(file2Path)
    stop()
  }
})
