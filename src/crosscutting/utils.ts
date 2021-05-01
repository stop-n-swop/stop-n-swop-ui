export const never = () =>
  new Promise<never>(() => {
    // !
  });
