export interface Category {
  id: string;
  name: string;
  level: number;
  parent?: string;
  children?: Category[];
}
