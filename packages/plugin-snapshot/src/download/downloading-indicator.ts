import { ux } from 'cli-ux'

import { DownloadOptions } from './file-downloader'

export default async (
  downloader: (downloadOpts: DownloadOptions) => Promise<string>,
  args: DownloadOptions,
) => {
  ux.action.start(`Downloading snapshot from ${args.url}`, '', { stdout: true })
  const outputPath = await downloader(args)
  ux.action.stop()
  return outputPath
}
