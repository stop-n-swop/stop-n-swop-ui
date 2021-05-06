export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

export const never = () =>
  new Promise<never>(() => {
    // !
  });

export const isEmpty = (obj: any) => {
  if (obj == null) {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }
  return false;
};
