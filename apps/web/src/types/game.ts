export interface IGame {
  id: string;
  name: string;
  logo: string;
  colors?: {
    from: string;
    to: string;
  };
}
