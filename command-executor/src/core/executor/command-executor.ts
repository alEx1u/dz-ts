import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handler/srteam.interface';
import { ICommand } from './command.types';

export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {}

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const spawn = this.spawn(command);
    this.processStream(spawn, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommand;
  protected abstract spawn(command: ICommand): ChildProcessWithoutNullStreams;
  protected abstract processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void;
}
