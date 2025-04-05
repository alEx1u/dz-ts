import inquirer from 'inquirer';
import { PromptType } from './prompt';

export class PromptService {
  public async input<T>(message: string, type: PromptType) {
    const data = inquirer.prompt<{ result: T }>({
      type,
      name: 'result',
      message
    });
    return data;
  }
}
