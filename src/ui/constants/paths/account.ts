export const DASHBOARD = '/my/dashboard/:section?/:subSection?';
export const makeDashboardPath = ({
  section,
  subSection,
}: { section?: string; subSection?: string } = {}) => {
  if (subSection && section) {
    return `/my/dashboard/${encodeURIComponent(section)}/${encodeURIComponent(
      subSection,
    )}`;
  }
  if (section) {
    return `/my/dashboard/${encodeURIComponent(section)}`;
  }
  return '/my/dashboard';
};

export const BALANCE = '/my/balance';
export const makeBalancePath = () => BALANCE;
