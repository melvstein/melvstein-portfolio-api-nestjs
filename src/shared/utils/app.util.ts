export class AppUtil {
  static LocalDateTimeFormatted(date: Date): string {
    const formatted = date
      .toLocaleString('sv-SE', {
        timeZone: 'Asia/Manila',
        hour12: false,
      })
      .replace(',', '');

    return formatted;
  }
}
