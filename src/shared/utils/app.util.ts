export const localDateTimeFormatted = (date: Date): string => {
  return date
    .toLocaleString('sv-SE', {
      timeZone: 'Asia/Manila',
      hour12: false,
    })
    .replace(',', '');
};
