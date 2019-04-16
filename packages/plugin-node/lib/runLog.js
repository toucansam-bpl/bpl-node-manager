"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
function runLogs(processName, lines) {
    const pm2Path = path_1.resolve(__dirname, '..', 'node_modules', 'pm2', 'bin', 'pm2');
    const commandArgs = ['logs', processName];
    const flagArgs = lines ? ['--lines', lines.toString()] : [];
    child_process_1.spawn(pm2Path, commandArgs.concat(flagArgs), { stdio: 'inherit' });
}
exports.default = runLogs;
