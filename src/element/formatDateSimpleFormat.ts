/**
 * fecha en formato dd/mm/yyyy/hh/mm/ss
 * @param date
 */
export const formatDate = (date: string) => {
  const d: Date = new Date(date);
  return d.toLocaleString("es-CO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
};

/**
 * fecha en formato dd/mm/yyyy/hh/mm/ss
 * @param date
 */
export const date = (): string => {
  const d: Date = new Date();
  return d.toLocaleString("es-CO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
};

export const formatDateDayMontYear = (date: string) => {
  const d: Date = new Date(date);
  return d.toLocaleString("es-CO", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
};

/**
 * fecha en formato hh:mm
 * @param time hh:mm
 */
export const dateTimeSimple = (time: string): Date => {
  const d: Date = new Date();
  const h = time.split(":");
  d.setHours(parseInt(h[0]));
  d.setMinutes(parseInt(h[1]));
  d.setSeconds(0);
  return d;
};

export const timeSimpleHM = (time: string): string => {
  const hour = time.split(":")[0];
  const minute = time.split(":")[1];
  const hourNumber = parseInt(hour);
  const minuteNumber = parseInt(minute);
  const hourFormat = hourNumber > 12 ? hourNumber - 12 : hourNumber;
  const hourFormatString = hourFormat < 10 ? `0${hourFormat}` : hourFormat;
  const minuteFormatString = minuteNumber < 10 ? `0${minuteNumber}` : minuteNumber;
  const ampm = hourNumber >= 12 ? "PM" : "AM";
  return `${hourFormatString}:${minuteFormatString} ${ampm}`;
};