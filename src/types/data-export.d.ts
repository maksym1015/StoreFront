export interface Layout {
  layoutId: string;
  name: string;
  active: string;
  cols: string[];
  options: {
    delimiter: string;
    filename: string;
    output: string;
  };
}

interface DataExportConfig {
  layouts: Layout[];
  pattern: {
    name: string;
    patternId: string;
    section: string;
  };
  exportRange: number;
  exportsFields: Array<{
    key: string;
    title: string;
    required: boolean;
    disabled: boolean;
  }>;
}
