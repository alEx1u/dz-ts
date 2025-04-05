/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStreamLogger } from '../../core/handler/srteam.interface';

export class ConsoleLogger implements IStreamLogger {
  private static instance: ConsoleLogger;
  public static getInstance() {
    if (!ConsoleLogger.instance) {
      ConsoleLogger.instance = new ConsoleLogger();
    }
    return ConsoleLogger.instance;
  }

  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.error(...args);
  }
  end(): void {
    console.log('Закончили упражнение!');
  }
}
