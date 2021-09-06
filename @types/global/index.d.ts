interface Window {
  pa: {
    track: (args: {
      name: string;
      value?: string | number;
      unit?: string;
    }) => void;
  };
  contra: boolean;
}
