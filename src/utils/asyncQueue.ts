import { EventEmitter } from 'eventemitter3';
import { reactive } from 'vue';
import { removeAt } from './array';
import logger from './logger';

type AsyncFunction = () => Promise<void>;

interface AsyncQueueItem<T = any> {
  id: string;
  running: boolean;
  fn: AsyncFunction;
  info: T;
}

export class AsyncQueue<T = any> {
  readonly queue = reactive<Array<AsyncQueueItem<T>>>([]);
  readonly emitter = new EventEmitter<{ finish: [] }>();
  private singleRunning = false;

  constructor(private readonly thread = 1) {}

  get length(): number {
    return this.queue.length;
  }

  private get runningThreadNum(): number {
    return this.queue.filter(({ running }) => running).length;
  }

  canSingleStart = (): boolean => true;

  push(fn: AsyncFunction, info: any): void {
    this.queue.push({
      id: crypto.randomUUID(),
      running: false,
      fn,
      info,
    });
  }

  async start(): Promise<void> {
    if (this.thread <= 1) {
      if (this.singleRunning || this.queue.length === 0) return;
      this.singleRunning = true;
      do {
        if (!this.canSingleStart()) {
          this.singleRunning = false;
          return;
        }
        await this.queue[0]!.fn();
        this.queue.shift();
      } while (this.queue.length > 0);
      this.singleRunning = false;
      this.emitter.emit('finish');
    } else {
      const running = this.runningThreadNum;
      if (running >= this.thread || this.queue.length === running) return;
      const idleItems = this.queue.filter(({ running }) => !running);
      for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
        const item = idleItems[i]!;
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

  async skipFromError(): Promise<void> {
    this.queue.shift();
    await this.restartFromError();
  }

  async restartFromError(): Promise<void> {
    this.singleRunning = false;
    await this.start();
  }
}
