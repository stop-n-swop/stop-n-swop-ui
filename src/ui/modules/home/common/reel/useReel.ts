import { useBreakpoints } from 'ui/breakpoints';

export default function useReel() {
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

  return { size };
}
