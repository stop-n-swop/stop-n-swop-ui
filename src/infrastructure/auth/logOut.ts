import jpex from 'jpex';
import type { ClearTokens, LogOut } from 'core/auth';

const logOut = (clearTokens: ClearTokens): LogOut => clearTokens;

jpex.factory<LogOut>(logOut);
