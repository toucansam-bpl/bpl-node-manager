import { parse } from 'url'
export default (fileOpts: { currentDatetime: Date; snapshotUrl: string }) => {
  const url = parse(fileOpts.snapshotUrl)

  if (!url.hostname) {
    throw Error(`${fileOpts.snapshotUrl} does not have a hostname.`)
  }

  const hostnameParts = url.hostname.split('.').reverse()
  const [tld, domain] = hostnameParts
  const year = fileOpts.currentDatetime.getUTCFullYear()
  const month = ('0' + fileOpts.currentDatetime.getUTCMonth()).slice(-2)
  const day = ('0' + fileOpts.currentDatetime.getUTCDate()).slice(-2)
  const hour = ('0' + fileOpts.currentDatetime.getUTCHours()).slice(-2)
  const minute = ('0' + fileOpts.currentDatetime.getUTCMinutes()).slice(-2)

  return `${domain}-${tld}-${year}${month}${day}${hour}${minute}`
}
