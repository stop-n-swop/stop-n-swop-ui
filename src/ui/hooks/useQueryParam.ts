import { useLocation } from 'react-router-dom';

export default function useQueryParam<R = string>(key: string) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return (params.get(key) as any) as R;
}
