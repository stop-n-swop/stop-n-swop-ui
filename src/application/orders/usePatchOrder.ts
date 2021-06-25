import { useAction } from '@respite/action';
import { PatchOrderKey } from 'application/keys';
import { encase } from 'react-jpex';
import type { PatchOrder } from 'core/orders';

export const usePatchOrder = encase((patchOrder: PatchOrder) => () => {
  return useAction(PatchOrderKey, patchOrder, []);
});
