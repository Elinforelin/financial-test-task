const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getDate = (date) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDay();
  return `${day < 10 ? `0${day}` : day} ${monthNames[month]} ${year}`;
};

export const getTime = (date) => {
  const hours = new Date(date).getHours();
  const min = new Date(date).getMinutes();
  const sec = new Date(date).getSeconds();
  return `${hours}:${min}:${sec < 10 ? `0${sec}` : sec}`;
};
