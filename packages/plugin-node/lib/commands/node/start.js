"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const parser_1 = require("@oclif/parser");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const pm2_1 = require("pm2");
const util_1 = require("util");
const exists = util_1.promisify(fs_1.exists);
class NodeStartCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(NodeStartCommand);
        const isBplNodeInstalled = await exists(flags["node-dir"]);
        if (!isBplNodeInstalled) {
            this.error(`bpl-node is not installed in ${flags["node-dir"]}.`);
            return;
        }
        pm2_1.connect(err => {
            if (err) {
                console.log(err);
                process.exit(2);
            }
            const mainnetArgs = ['--genesis', 'genesisBlock.mainnet.json', '--config', 'config.mainnet.json'];
            const flagArgs = ['--log', flags["log-level"]];
            const nodeOptions = {
                args: mainnetArgs.concat(flagArgs),
                cwd: flags["node-dir"],
                name: 'bpl-node',
                script: 'app.js'
            };
            this.log(`bpl-node starting`);
            pm2_1.start(nodeOptions, (err, apps) => {
                pm2_1.disconnect();
                if (err) {
                    this.warn(`bpl-node not started`);
                    this.error(err);
                }
                else {
                    this.log(`bpl-node started`);
                }
            });
        });
    }
}
NodeStartCommand.flags = {
    "log-level": parser_1.flags.string({
        default: 'debug',
        description: 'Log level for the bpl-node logs',
        options: ['debug', 'info', 'warn'],
        required: true,
    }),
    "node-dir": parser_1.flags.string({
        default: path_1.resolve(os_1.homedir(), 'BPL-node'),
        description: 'Directory containing bpl-node code',
        required: true,
    })
};
exports.NodeStartCommand = NodeStartCommand;
