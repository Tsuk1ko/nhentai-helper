import { isNotNil } from 'es-toolkit';

export const removeAt = <T>(array: T[], index: number): T | undefined => array.splice(index, 1)[0];

export const filterNotNil = <T>(array: Array<T | null | undefined>): T[] => array.filter(isNotNil);

export const objectEach = <K extends keyof any, V>(
  object: Record<K, V>,
  iteratee: (value: V, key: K, object: Record<K, V>) => void,
): void => {
  Object.entries(object).forEach(([key, value]) => {
    iteratee(value as V, key as K, object);
  });
};
