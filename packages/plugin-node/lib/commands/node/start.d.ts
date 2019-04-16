import { Command } from '@oclif/command';
import { flags } from '@oclif/parser';
export declare class NodeStartCommand extends Command {
    static flags: {
        "log-level": flags.IOptionFlag<string>;
        "node-dir": flags.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
