// src/lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines classes using clsx and merges conflicting Tailwind classes with twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
};


export const calculateSquareMeters = (width: number, height: number): number => {
  return Number(((width * height) / 1000000).toFixed(2));
};

export const calculateTileCount = (width: number, height: number, tileSize: number): number => {
  const cols = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);
  return cols * rows;
};


// src/components/utils.ts
export const calculateGridSize = (containerWidth: number, itemBaseSize: number, maxRange: number) => {
  // Calculate the number of items and size of each item to fit container
  let columns = Math.floor(containerWidth / itemBaseSize);
  let itemSize = containerWidth / columns;

  // Check if items exceed the max range; if so, add a column and reset size
  if (itemSize > maxRange) {
      columns += 1;
      itemSize = containerWidth / columns;
  }

  return { columns, itemSize };
};
