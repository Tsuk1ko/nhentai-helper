import { minBy } from 'lodash-es';

export class Counter {
  private readonly countMap: Record<string, number> = {};
  private readonly countKeys: string[];

  public constructor(keys: string[]) {
    if (!keys.length) throw new Error('Counter no key');
    this.countKeys = [...keys];
    this.countKeys.forEach(key => {
      this.countMap[key] = 0;
    });
  }

  public add(key: string) {
    this.countMap[key]++;
  }

  public del(key: string) {
    this.countMap[key]--;
  }

  public getMin() {
    return minBy(this.countKeys, key => this.countMap[key])!;
  }
}
