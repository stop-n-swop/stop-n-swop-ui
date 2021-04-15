import jpex from 'jpex';
import type { ClearTokens, LogOut } from 'ports/auth';

const logOut = (clearTokens: ClearTokens): LogOut => clearTokens;

jpex.factory<LogOut>(logOut);
