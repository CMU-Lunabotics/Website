/** Academic season runs August 1 through July 31. */

export function seasonKey(isoDate: string): string {
  const [yearRaw, monthRaw] = isoDate.slice(0, 10).split('-');
  const year = Number(yearRaw) || 1970;
  const month = Number(monthRaw) || 1;
  const startYear = month >= 8 ? year : year - 1;
  return `${startYear}-${startYear + 1}`;
}

export function seasonLabel(key: string): string {
  const [start, end] = key.split('-');
  return `${start}–${end}`;
}

export function formatUpdateDate(isoDate: string): string {
  const [yearRaw, monthRaw, dayRaw] = isoDate.slice(0, 10).split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  if (!year || !month || !day) return isoDate;
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
