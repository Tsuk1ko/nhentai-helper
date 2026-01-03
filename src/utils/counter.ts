import { minBy, sample, without } from 'es-toolkit';

export class Counter {
  private key: string | undefined;
  private countMap!: Record<string, number>;
  private readonly countKeys: string[];
  private readonly blackList = new Set<string>();

  constructor(keys: string[]) {
    if (!keys.length) throw new Error('Counter no key');
    this.countKeys = [...keys];
    this.reset();
  }

  private get availableKeys() {
    return without(this.countKeys, ...this.blackList);
  }

  add(key: string) {
    this.countMap[key]!++;
  }

  del(key: string) {
    this.countMap[key]!--;
  }

  ban(key: string) {
    this.blackList.add(key);
    return this.availableKeys.length > 0;
  }

  getMin(key?: string) {
    this.updateKey(key);
    return minBy(this.availableKeys, key => this.countMap[key]!)!;
  }

  getRandom(key?: string) {
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
