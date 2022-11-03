const filter = (tickets, filters = []) => {
  console.log(filters, 'ssssssssss');
  const res = tickets.filter((tick) =>
    tick.segments.every(({ stops }) =>
      filters.some((count) => +count === stops.length)
    )
  );
  return res;
};

const sort = (array, sortItem) => {
  const newArr = [...array];
  switch (sortItem) {
    case 'cheap':
      return newArr.sort((a, b) => a.price - b.price);
    case 'expensive':
      return newArr.sort((a, b) => b.price - a.price);
    default:
      return newArr;
  }
};

export const toNeccessaryData = (arr, fil, sor) => sort(filter(arr, fil), sor);

// formatters=================================================

export const formatDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60 < 10 ? `0${duration % 60}` : duration % 60;

  return `${hours}ч ${minutes}м`;
};

export const formatTime = (date) => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
};

export const getTimeZone = (zone) => {
  switch (zone) {
    // Москва
    case 'MOW':
      return 180 * 60 * 1000;
    // Пхукет
    case 'HKT':
      return 420 * 60 * 1000;
    default:
      return 0;
  }
};

export const formatStops = (count) => {
  if (count === 0) return `без пересадок`;
  if (count === 1) return `${count} пересадка`;
  if (count <= 4) return `${count} пересадки`;
  return `${count} пересадок`;
};
