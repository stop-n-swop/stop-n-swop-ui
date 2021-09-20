// TODO: most of these crosscutting methods in ui/api/admin can probably be shared in a common package

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
  if (typeof obj === 'string') {
    return obj === '';
  }
  return false;
};

export const omitNullProperties = <T>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null),
  ) as T;
};

export const omitEmptyProperties = <T>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => !isEmpty(value)),
  ) as T;
};

export const sortBy = <T>(list: T[], fn: (t: T) => any, asc = true) => {
  return list.slice().sort((a, b) => {
    const x = fn(a);
    const y = fn(b);

    if (asc) {
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    }
    if (x > y) {
      return -1;
    }
    if (x < y) {
      return 1;
    }
    return 0;
  });
};

export const isNumeric = (x: string | number) => {
  return Boolean(x && !Number.isNaN(Number(x)));
};
