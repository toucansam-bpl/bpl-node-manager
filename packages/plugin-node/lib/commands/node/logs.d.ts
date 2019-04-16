import { Command } from '@oclif/command';
import { flags } from '@oclif/parser';
export declare class NodeLogsCommand extends Command {
    static flags: {
        lines: flags.IOptionFlag<number | undefined>;
    };
    run(): Promise<void>;
}
