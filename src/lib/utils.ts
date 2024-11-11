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
