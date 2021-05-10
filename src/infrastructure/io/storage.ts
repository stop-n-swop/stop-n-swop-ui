import jpex from 'jpex';
import type { Storage } from 'core/io';

jpex.constant<Storage>(window.localStorage);
