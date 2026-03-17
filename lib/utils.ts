import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function bn(num: number | string): string {
  const d = ['০','१','२','३','४','५','६','७','८','९']
  return String(num).replace(/[0-9]/g, n => d[parseInt(n)])
}
