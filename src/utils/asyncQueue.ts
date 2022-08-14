import { reactive } from 'vue';
import { EventEmitter } from 'eventemitter3';
import { v4 as uuid } from 'uuid';
import logger from './logger';
import { removeAt } from './array';

type AsyncFunction = () => Promise<void>;

interface AsyncQueueItem<T = any> {
  id: string;
  running: boolean;
  fn: AsyncFunction;
  info: T;
}

export class AsyncQueue<T = any> {
  public readonly queue = reactive<Array<AsyncQueueItem<T>>>([]);
  public readonly emitter = new EventEmitter<{ finish: [] }>();
  public canSingleStart = (): boolean => true;
  private singleRunning = false;

  public constructor(private readonly thread = 1) {}

  private get runningThreadNum(): number {
    return this.queue.filter(({ running }) => running).length;
  }

  public get length(): number {
    return this.queue.length;
  }

  public push(fn: AsyncFunction, info: any): void {
    this.queue.push({
      id: uuid(),
      running: false,
      fn,
      info,
    });
  }

  public async start(): Promise<void> {
    if (this.thread <= 1) {
      if (this.singleRunning || this.queue.length === 0) return;
      this.singleRunning = true;
      do {
        if (!this.canSingleStart()) {
          this.singleRunning = false;
          return;
        }
        await this.queue[0].fn();
        this.queue.shift();
      } while (this.queue.length > 0);
      this.singleRunning = false;
      this.emitter.emit('finish');
    } else {
      const running = this.runningThreadNum;
      if (running >= this.thread || this.queue.length === running) return;
      const idleItems = this.queue.filter(({ running }) => !running);
      for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
        const item = idleItems[i];
        item.running = true;
        item
          .fn()
          .then(async () => {
            removeAt(
              this.queue,
              this.queue.findIndex(({ id }) => id === item.id),
            );
            if (this.queue.length) await this.start();
            else this.emitter.emit('finish');
          })
          .catch(logger.error);
      }
    }
  }

  public async skipFromError(): Promise<void> {
    this.queue.shift();
    await this.restartFromError();
  }

  public async restartFromError(): Promise<void> {
    this.singleRunning = false;
    await this.start();
  }
}
