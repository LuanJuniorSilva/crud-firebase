export type NavigationProps = {
  navigate: (str: string, obg?: object) => void;
  setOptions: (obj: object) => void;
  reset: (obj: object) => void;
  goBack: () => void;
};
