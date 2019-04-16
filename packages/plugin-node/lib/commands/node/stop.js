"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const pm2_1 = require("pm2");
class NodeStopCommand extends command_1.Command {
    async run() {
        pm2_1.connect(err => {
            if (err) {
                console.log(err);
                process.exit(2);
            }
            pm2_1.stop('bpl-node', err => {
                pm2_1.disconnect();
                if (err)
                    throw err;
            });
        });
    }
}
exports.NodeStopCommand = NodeStopCommand;
