/* tslint:disable:no-floating-promises */
import { describe } from 'riteway'

import { pluginsKey, viewPlugins } from '../view-plugins'

describe('view-plugins', async assert => {
  const plugins1 = { plugin: 1 }
  const plugins2 = { plugin: 2 }

  assert({
    given: 'a config file',
    should: 'return plugins section',
    actual: viewPlugins({ [pluginsKey]: plugins1 }),
    expected: plugins1,
  })

  assert({
    given: 'a config file',
    should: 'return alternate plugins section',
    actual: viewPlugins({ [pluginsKey]: plugins2 }),
    expected: plugins2,
  })
})
