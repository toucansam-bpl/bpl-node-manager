/* tslint:disable:no-floating-promises */
import { writeMessage } from '../../cli-testing'
import downloadingIndicator from '../downloading-indicator'
import { DownloadOptions } from '../file-downloader'

const fakeDownload = (args: DownloadOptions): Promise<string> => {
  return new Promise(resolve => setTimeout(() => resolve(args.outputPath), 1000))
}

const runCli = async () => {
  try {
    writeMessage(
      await downloadingIndicator(fakeDownload, {
        outputPath: 'this/is/an/output/path',
        url: 'http://test.url',
      }),
    )
  } catch (ex) {
    throw ex
  }
}
runCli()
