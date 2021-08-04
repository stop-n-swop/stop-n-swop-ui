import jpex from 'jpex';
import type { ClearNotices } from 'core/notices';
import type { AuthDriver } from 'core/io';

jpex.factory<ClearNotices>((driver: AuthDriver) => async () => {
  await driver({
    url: '/notices/my',
    method: 'DELETE',
  });
});
