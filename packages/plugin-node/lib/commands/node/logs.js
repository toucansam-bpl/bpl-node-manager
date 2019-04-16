"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const parser_1 = require("@oclif/parser");
const runLog_1 = require("../../runLog");
class NodeLogsCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(NodeLogsCommand);
        runLog_1.default('bpl-node', flags.lines);
    }
}
NodeLogsCommand.flags = {
    lines: parser_1.flags.integer(),
};
exports.NodeLogsCommand = NodeLogsCommand;
