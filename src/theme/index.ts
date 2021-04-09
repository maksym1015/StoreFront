export interface Theme {
  breakpoints: string[];
  animations: {
    [key: string]: AnimationOptions;
  };
  colors: {
    [key: string]: string;
  };
  hero: {
    [key: string]: CSSValue;
  };
  fonts: {
    body: CSSValue;
    heading: CSSValue;
  };
  buttons: {
    [key: string]: {
      [key: string]: CSSValue;
    };
  };
  header: {
    full: {
      [key: string]: CSSValue;
    };
    small: {
      [key: string]: CSSValue;
    };
  };
  border: {
    primary: CSSValue;
  };
  cart: any;
}

type CSSValue = string | number | number[];

interface AnimationOptions {
  duration: number;
}
