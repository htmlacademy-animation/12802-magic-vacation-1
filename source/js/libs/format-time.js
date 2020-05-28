/**
 * @typedef {Object} ParsedTime
 * @property {number} hours часы
 * @property {number} min минуты
 * @property {number} sec секунды
 */

/**
 * Функция для парсинга времени
 * @param {number} time время в секундах
 * @return {ParsedTime} объект с данными о времени
 */
export function parseTime(time) {
  let hours;
  const hasHours = time / 3600 >= 1;

  if (hasHours) {
    hours = Math.floor(time / 3600);
    time = time - hours * 3600;
  }

  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);

  return {
    hours,
    min,
    sec
  };
}

function isNil(arg) {
  return arg === void 0 || arg === null;
}

export function numberToPadString(num) {
  if (!isNil(num)) {
    num = num.toString();
    return num.length < 2 ? `0${num}` : num;
  } else {
    return ``;
  }
}

export function standardFormatter(timeData) {
  timeData = [
    numberToPadString(timeData.hours),
    numberToPadString(timeData.min),
    numberToPadString(timeData.sec),
  ].filter(Boolean);
  return timeData.join(`:`);
}

export function formatTime(time, formatter = standardFormatter) {
  return formatter(parseTime(time));
}
