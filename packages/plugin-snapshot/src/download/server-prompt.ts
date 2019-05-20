import { prompt } from 'inquirer'

export default async (servers: string[]) => {
  try {
    return await prompt<{ selectedServer: string }>([
      {
        type: 'list',
        name: 'selectedServer',
        message: 'Download snapshot from:',
        choices: servers,
      },
    ]).then(answers => answers.selectedServer)
  } catch (ex) {
    throw ex
  }
}
