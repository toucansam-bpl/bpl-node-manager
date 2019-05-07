bpl-node-manager
================

Pluggable Blockpool Node Manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bpl-node-manager.svg)](https://npmjs.org/package/bpl-node-manager)
[![Downloads/week](https://img.shields.io/npm/dw/bpl-node-manager.svg)](https://npmjs.org/package/bpl-node-manager)
[![License](https://img.shields.io/npm/l/bpl-node-manager.svg)](https://github.com/toucansam-bpl//blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bpl-cli
$ bpl COMMAND
running command...
$ bpl (-v|--version|version)
bpl-cli/1.0.8-alpha.0 darwin-x64 node-v11.13.0
$ bpl --help [COMMAND]
USAGE
  $ bpl COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bpl autocomplete [SHELL]`](#bpl-autocomplete-shell)
* [`bpl hello`](#bpl-hello)
* [`bpl help [COMMAND]`](#bpl-help-command)
* [`bpl plugins`](#bpl-plugins)
* [`bpl plugins:install PLUGIN...`](#bpl-pluginsinstall-plugin)
* [`bpl plugins:link PLUGIN`](#bpl-pluginslink-plugin)
* [`bpl plugins:uninstall PLUGIN...`](#bpl-pluginsuninstall-plugin)
* [`bpl plugins:update`](#bpl-pluginsupdate)

## `bpl autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ bpl autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ bpl autocomplete
  $ bpl autocomplete bash
  $ bpl autocomplete zsh
  $ bpl autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.0/src/commands/autocomplete/index.ts)_

## `bpl hello`

```
USAGE
  $ bpl hello
```

## `bpl help [COMMAND]`

display help for bpl

```
USAGE
  $ bpl help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `bpl plugins`

list installed plugins

```
USAGE
  $ bpl plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ bpl plugins
```

_See code: [@toucansam-bpl/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/index.ts)_

## `bpl plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ bpl plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ bpl plugins:add

EXAMPLES
  $ bpl plugins:install myplugin 
  $ bpl plugins:install https://github.com/someuser/someplugin
  $ bpl plugins:install someuser/someplugin
```

_See code: [@toucansam-bpl/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/install.ts)_

## `bpl plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ bpl plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ bpl plugins:link myplugin
```

_See code: [@toucansam-bpl/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/link.ts)_

## `bpl plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ bpl plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ bpl plugins:unlink
  $ bpl plugins:remove
```

_See code: [@toucansam-bpl/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/uninstall.ts)_

## `bpl plugins:update`

update installed plugins

```
USAGE
  $ bpl plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@toucansam-bpl/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.8/src/commands/plugins/update.ts)_
<!-- commandsstop -->
