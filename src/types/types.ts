// types.ts
export interface GridItem {
    id: number;
    content?: React.ReactNode;
  }
  
export  interface GridMetrics {
    columns: number;
    rows: number;
    itemSize: number;
  }
  
  export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl';