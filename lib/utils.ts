import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function bn(num: number | string): string {
  const d = ['\u09E6','\u09E7','\u09E8','\u09E9','\u09EA','\u09EB','\u09EC','\u09ED','\u09EE','\u09EF']
  return String(num).replace(/[0-9]/g, n => d[parseInt(n)])
}

export function BnDigit({ n }: { n: number | string }) {
  const bengali = String(n).replace(/[0-9]/g, d => 
    ['\u09E6','\u09E7','\u09E8','\u09E9','\u09EA','\u09EB','\u09EC','\u09ED','\u09EE','\u09EF'][parseInt(d)]
  )
  return React.createElement("span", { className: "bn-digit" }, bengali)
}

export function convertToBengaliDigits(text: string): string {
  const d = ['\u09E6','\u09E7','\u09E8','\u09E9','\u09EA','\u09EB','\u09EC','\u09ED','\u09EE','\u09EF']
  return text.replace(/[0-9]/g, n => d[parseInt(n)])
}
