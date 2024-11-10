import { useState, RefObject, useCallback } from 'react';
import { GridItem, GridMetrics, BreakPoint } from '../types/types';

const GRID_CONSTANTS = {
  MIN_ITEM_SIZE: 60,
  MAX_ITEM_SIZE: 120,
  INITIAL_ITEM_SIZE: 90,
  SIZE_STEP: 10,
  MIN_COLUMNS: 3,
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  ROW_COUNTS: {
    sm: 2,
    md: 3,
    lg: 5,
    xl: 5,
  },
} as const;

const useGridCalculations = (
  containerRef: RefObject<HTMLDivElement>,
  initialItemSize: number
) => {
  const [metrics, setMetrics] = useState<GridMetrics>({
    columns: GRID_CONSTANTS.MIN_COLUMNS,
    rows: GRID_CONSTANTS.ROW_COUNTS.sm,
    itemSize: initialItemSize,
  });

  const [items, setItems] = useState<GridItem[]>([]);

  const getCurrentBreakpoint = (): BreakPoint => {
    const width = window.innerWidth;
    if (width >= GRID_CONSTANTS.BREAKPOINTS.xl) return 'xl';
    if (width >= GRID_CONSTANTS.BREAKPOINTS.lg) return 'lg';
    if (width >= GRID_CONSTANTS.BREAKPOINTS.md) return 'md';
    return 'sm';
  };

  const calculateGridMetrics = useCallback((): GridMetrics => {
    if (!containerRef.current) return metrics;

    const containerWidth = containerRef.current.clientWidth;
    const breakpoint = getCurrentBreakpoint();
    const rows = GRID_CONSTANTS.ROW_COUNTS[breakpoint];
    const columns = Math.max(
      GRID_CONSTANTS.MIN_COLUMNS,
      Math.floor(containerWidth / metrics.itemSize)
    );

    return {
      columns,
      rows,
      itemSize: metrics.itemSize,
    };
  }, [containerRef, metrics.itemSize]);

  const generateGridItems = useCallback((columns: number, rows: number): GridItem[] => {
    return Array.from({ length: columns * rows }, (_, index) => ({
      id: index,
    }));
  }, []);

  const updateGrid = useCallback(() => {
    const newMetrics = calculateGridMetrics();
    setMetrics(newMetrics);
    setItems(generateGridItems(newMetrics.columns, newMetrics.rows));
  }, [calculateGridMetrics, generateGridItems]);

  return {
    metrics,
    items,
    updateGrid,
    setMetrics,
  };
};

export default useGridCalculations;
