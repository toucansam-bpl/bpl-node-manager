import { rmdir as rmdirWithCallback, unlink as unlinkWithCallback } from 'fs'
import { promisify } from 'util'

export const rmdir = promisify(rmdirWithCallback)
export const unlink = promisify(unlinkWithCallback)
