function fixedTime(hora) {
  const day = new Date();
  day.setHours(...hora.split(":"), 0);

  return day;
}

function calculateInterval(startHour, endHour) {
  let startDate = fixedTime(startHour);
  let endDate = fixedTime(endHour);

  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }


  const difference = endDate - startDate;
  const hours = Math.floor(difference / 36e5);
  const minutes = Math.floor((difference % 36e5) / 6e4);

  return [hours, minutes];
}

export const totalHourWorked = (start, end) => {
  let totalHour
  const [hours, minutes] = calculateInterval(start, end);

  let diccMinute = {
    15: 25,
    30: 50,
    45: 75
  };


  totalHour = ([hours].concat((diccMinute[minutes] === undefined ? 0 : diccMinute[minutes])))
  
  
  return transformToMinute(totalHour);
};


export const transformToMinute = (hours) => {
  return (Number(hours.join('.')) * 36e5)
}

export const transformToHour = (minute) => {
  return (minute / 36e5)
}