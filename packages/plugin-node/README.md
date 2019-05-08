@toucnsam-bpl/node
==================

Node management plugin for BPL Node Manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@toucnsam-bpl/node.svg)](https://npmjs.org/package/@toucnsam-bpl/node)
[![Downloads/week](https://img.shields.io/npm/dw/@toucnsam-bpl/node.svg)](https://npmjs.org/package/@toucnsam-bpl/node)
[![License](https://img.shields.io/npm/l/@toucnsam-bpl/node.svg)](https://github.com/toucansam-bpl/node/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @toucansam-bpl/plugin-node
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@toucansam-bpl/plugin-node/1.0.10-alpha.0 darwin-x64 node-v11.13.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example node:logs`](#oclif-example-nodelogs)
* [`oclif-example node:restart`](#oclif-example-noderestart)
* [`oclif-example node:start`](#oclif-example-nodestart)
* [`oclif-example node:stop`](#oclif-example-nodestop)

## `oclif-example node:logs`

```
USAGE
  $ oclif-example node:logs

OPTIONS
  --lines=lines
```

_See code: [src/commands/node/logs.ts](https://github.com/toucansam-bpl/node/blob/v1.0.10-alpha.0/src/commands/node/logs.ts)_

## `oclif-example node:restart`

```
USAGE
  $ oclif-example node:restart
```

_See code: [src/commands/node/restart.ts](https://github.com/toucansam-bpl/node/blob/v1.0.10-alpha.0/src/commands/node/restart.ts)_

## `oclif-example node:start`

```
USAGE
  $ oclif-example node:start

OPTIONS
  --log-level=debug|info|warn  (required) [default: info] Log level for the bpl-node logs
  --node-dir=node-dir          (required) [default: /Users/bmavity/BPL-node] Directory containing bpl-node code
```

_See code: [src/commands/node/start.ts](https://github.com/toucansam-bpl/node/blob/v1.0.10-alpha.0/src/commands/node/start.ts)_

## `oclif-example node:stop`

```
USAGE
  $ oclif-example node:stop
```

_See code: [src/commands/node/stop.ts](https://github.com/toucansam-bpl/node/blob/v1.0.10-alpha.0/src/commands/node/stop.ts)_
<!-- commandsstop -->
