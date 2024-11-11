// types.ts
export interface GridItems {
    id: number;
    content?: React.ReactNode;
  }
  
export  interface GridMetrics {
    columns: number;
    rows: number;
    itemSize: number;
  }
  
  export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl';


  export interface GridItem {
    id: string;
    width: number;
    height: number;
    row: number;
    column: number;
  }
  
  export interface Dimensions {
    height: number;
    width: number;
  }
  
  export interface SizePreset {
    name: string;
    dimensions: string;
    squareMeter: number;
    tileSize: number;
  }