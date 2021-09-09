import jpex from 'jpex';
import cookies from 'browser-cookies';
import type { Storage } from 'core/io';

jpex.constant<Storage>(cookies);
