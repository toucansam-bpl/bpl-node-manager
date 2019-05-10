import { createConfigItems } from '../../init'

export default async function hook(plugin: { name: string }) {
  console.log(plugin)
  createConfigItems()
}
