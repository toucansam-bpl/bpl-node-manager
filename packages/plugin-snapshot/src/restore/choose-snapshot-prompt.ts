import { prompt } from 'inquirer'

export default async (snapshots: string[]) => {
  try {
    return await prompt<{ selectedSnapshot: string }>([
      {
        type: 'list',
        name: 'selectedSnapshot',
        message: 'Choose a snapshot to restore',
        choices: snapshots,
      },
    ]).then(answers => answers.selectedSnapshot)
  } catch (ex) {
    throw ex
  }
}
