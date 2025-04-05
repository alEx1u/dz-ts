import { Bot } from 'grammy';
import { proccesStatus } from './telegramBot.service';

export class TelegramBot {
  private bot: Bot;
  private status: proccesStatus;

  public id: number | undefined = undefined;

  constructor(token: string) {
    this.bot = new Bot(token);
  }

  async start(message: string): Promise<void> {
    this.bot.command('start', (ctx) => ctx.reply(message));
    this.changeStatus('В процессе');
    this.bot.on('message', (ctx) => {
      if (this.id == undefined) {
        this.id = ctx.message.from.id;
      }
      ctx.reply(this.status);
    });
    this.bot.start();
    return this.bot.init();
  }

  getUrl(): string {
    return `https://t.me/${this.bot.botInfo.username}`;
  }

  notification(message: string): this {
    if (this.id == undefined) {
      this.changeStatus('Какие-то проблемы');
      throw new Error('Введите любое сообщение в Telegram для подключения');
    }
    this.bot.api.sendMessage(this.id, message);
    return this;
  }

  changeStatus(newStatus: proccesStatus): void {
    this.status = newStatus;
  }
}
