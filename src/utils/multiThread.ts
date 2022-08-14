import { settings } from './settings';

export interface TaskController {
  abort: Function;
  promise: Promise<void>;
}

export type TaskFunction<T = any, P = any> = (
  task: T,
  threadId: number,
  parmas: P,
) => TaskController;

export class MultiThread<T = any, P = any> {
  private readonly threads: TaskController[] = [];
  private taskIndex = 0;
  private started = false;
  private aborted = false;

  public constructor(
    private readonly tasks: T[],
    private readonly taskFunc: TaskFunction<T, P>,
    private readonly params: P,
  ) {}

  private startThread(threadId: number): TaskController {
    let abortFunc: Function | undefined;
    const threadPromise = (async () => {
      while (true) {
        if (this.aborted) break;
        const i = this.taskIndex++;
        if (i >= this.tasks.length) break;
        const { abort, promise } = this.taskFunc(this.tasks[i], threadId, this.params);
        abortFunc = abort;
        await promise;
      }
    })();
    return {
      abort: () => abortFunc?.(),
      promise: threadPromise,
    };
  }

  public start(): TaskController {
    if (this.started) throw new Error('Multi-thread started.');
    this.started = true;
    for (let threadId = 0; threadId < settings.threadNum; threadId++) {
      this.threads.push(this.startThread(threadId));
    }
    return {
      abort: () => {
        this.aborted = true;
        this.threads.forEach(({ abort }) => abort());
      },
      promise: Promise.all(this.threads.map(({ promise }) => promise)).then(),
    };
  }
}
