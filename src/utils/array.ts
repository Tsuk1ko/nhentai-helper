export const removeAt = <T>(array: T[], index: number): T | undefined => array.splice(index, 1)[0];
