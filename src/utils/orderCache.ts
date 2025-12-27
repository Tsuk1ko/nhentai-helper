export class OrderCache<T = any, U = any> extends Map<T, U> {
  private order: T[] = [];

  constructor(private readonly maxSize: number) {
    super();
  }

  set(key: T, value: U) {
    if (!super.has(key)) {
      if (super.size + 1 > this.maxSize) {
        const delKey = this.order.shift();
        if (delKey) super.delete(delKey);
      }
      this.order.push(key);
    }
    return super.set(key, value);
  }

  delete(key: T): boolean {
    const has = super.delete(key);
    if (has) {
      this.order.splice(
        this.order.findIndex(val => val === key),
        1,
      );
    }
    return has;
  }

  clear(): void {
    super.clear();
    this.order = [];
  }
}
