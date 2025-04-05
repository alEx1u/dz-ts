export class FfmpegBuilder {
  private input: string;
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set('-c:v', 'libx264');
  }

  in(path: string): this {
    this.input = path;
    return this;
  }

  setVideoSize(width: number, height: number): this {
    this.options.set('-s', `${width}x${height}`);
    return this;
  }

  out(outputPath: string): string[] {
    if (!this.input) {
      throw new Error('не задан параметр input');
    }
    const args: string[] = ['-i', this.input];
    this.options.forEach((value, key) => {
      args.push(key);
      args.push(value);
    });
    args.push(`${outputPath}.mp4`);
    return args;
  }
}
