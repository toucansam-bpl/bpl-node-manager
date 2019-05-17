import { prompt } from 'inquirer'

export default async (servers: string[]) => {
  try {
    return await prompt([
      {
        type: 'list',
        name: 'selectedServer',
        message: 'Download snapshot from:',
        choices: servers,
      },
    ])
  } catch (ex) {
    throw ex
  }
}
