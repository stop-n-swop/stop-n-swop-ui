import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useQueryParam<R = string>(
  key: string,
  { default: fallback, array }: { default?: R; array?: boolean } = {},
) {
  const { search } = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(search);
    const result = array ? params.getAll(key) : params.get(key);
    return ((result as any) as R) ?? fallback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
}
