export class TimeLock {
  private releaseTime = 0;

  constructor(private readonly timeout: number) {}

  lock(timeout = this.timeout) {
    this.releaseTime = Date.now() + timeout;
  }

  isLocked() {
    return Date.now() < this.releaseTime;
  }
}
