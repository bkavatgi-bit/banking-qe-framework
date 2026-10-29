/** Converts a displayed amount such as "$1,234.50" or "-$5.00" into a number. */
export function parseMoney(text: string): number {
  return Number(text.replace(/[^0-9.\-]/g, ''));
}
