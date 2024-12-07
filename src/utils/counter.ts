import { minBy, sample, without } from 'lodash-es';

export class Counter {
  private key: string | undefined;
  private countMap!: Record<string, number>;
  private readonly countKeys: string[];
  private readonly blackList = new Set<string>();

  public constructor(keys: string[]) {
    if (!keys.length) throw new Error('Counter no key');
    this.countKeys = [...keys];
    this.reset();
  }

  private get availableKeys() {
    return without(this.countKeys, ...this.blackList);
  }

  public add(key: string) {
    this.countMap[key]++;
  }

  public del(key: string) {
    this.countMap[key]--;
  }

  public ban(key: string) {
    this.blackList.add(key);
    return this.availableKeys.length > 0;
  }

  public getMin(key?: string) {
    this.updateKey(key);
    return minBy(this.availableKeys, key => this.countMap[key])!;
  }

  public getRandom(key?: string) {
    this.updateKey(key);
    return sample(this.availableKeys);
  }

  private updateKey(key?: string) {
    if (this.key === key) return;
    this.key = key;
    this.reset();
  }

  private reset() {
    this.countMap = Object.fromEntries(this.countKeys.map(key => [key, 0]));
    this.blackList.clear();
  }
}
