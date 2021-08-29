import { useEffect, useMemo, useState } from 'react';
import { useBreakpoints } from 'ui/breakpoints';

export default function useReel<T extends { id: any }>(data: T[]) {
  const offset = useMemo(() => {
    return 3000 * Math.random();
  }, []);
  const bp = useBreakpoints();
  const size = (() => {
    if (bp.xl) {
      return 5;
    }
    if (bp.lg) {
      return 4;
    }
    if (bp.sm) {
      return 3;
    }
    if (bp.xs) {
      return 2;
    }
    return 2;
  })();
  const totalPages = Math.floor(data.length / size);
  const [page, setPage] = useState(0);

  const slice = useMemo(() => {
    const start = page * size;
    const end = start + size;
    const slice = data.slice(start, end);
    return slice;
  }, [data, page, size]);

  useEffect(() => {
    const h = setTimeout(() => {
      let next = page + 1;
      if (next >= totalPages) {
        next = 0;
      }
      if (next !== page) {
        setPage(next);
      }
    }, 10000 + offset);
    return () => clearTimeout(h);
  }, [page, totalPages, offset]);

  useEffect(() => {
    setPage(0);
  }, [totalPages, size]);

  return { size, items: slice, page, totalPages };
}
