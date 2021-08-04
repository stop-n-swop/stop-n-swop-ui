import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import { ClearNoticesKey } from 'application/keys';
import type { ClearNotices } from 'core/notices';

export const useClearNotices = encase((clear: ClearNotices) => () => {
  return useAction(ClearNoticesKey, clear, []);
});
