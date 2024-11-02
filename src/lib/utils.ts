// src/lib/utils.ts
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines classes using clsx and merges conflicting Tailwind classes with twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
};
