import type { Notice } from '@sns/contracts/notice';

export type FetchNotices = () => Promise<Notice[]>;

export type MarkAsRead = () => Promise<void>;

export type ClearNotices = () => Promise<void>;
