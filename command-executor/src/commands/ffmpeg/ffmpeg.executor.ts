import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command-executor';
import { IStreamLogger } from '../../core/handler/srteam.interface';
import { ICommandFfmpeg, IFfmpegInput } from '../ffmpeg.types';
import { FileService } from '../../core/files/file.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { StreamHandler } from '../../core/handler/stream.handler';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    
    private fileService : FileService = new FileService();
    private promptService : PromptService = new PromptService();
    
    constructor(logger : IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = (await this.promptService.input<number>('Введи ширину', 'number')).result;
        const height = (await this.promptService.input<number>('Введи высоту', 'number')).result;
        const path = (await this.promptService.input<string>('Введи путь до файла', 'input')).result;
        const name = (await this.promptService.input<string>('Имя файла', 'input')).result;
        return { width, height, path, name }
    }
    protected build({ width, height, path, name}: IFfmpegInput): ICommandFfmpeg {
        const output = this.fileService.getFilePath(path, name);
        const args = (new FfmpegBuilder)
            .in(path)
            .setVideoSize(width, height)
            .out(name);
        return { command : 'ffmpeg', args : args, output};
    }
    protected spawn({command , args, output}: ICommandFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(output);
        return spawn(command, args);
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }

}