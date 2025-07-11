import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to combine class names with Tailwind CSS and clsx
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
