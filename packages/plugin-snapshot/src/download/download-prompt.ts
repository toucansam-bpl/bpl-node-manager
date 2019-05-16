import { prompt } from 'inquirer'

prompt([
  {
    type: 'list',
    name: 'theme',
    message: 'Download snapshot from:',
    choices: ['https://snapshots.blockpool.io', 'http://bplsnap.cryptooz.com'],
  },
])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '))
  })
  .catch(ex => console.log(ex))
