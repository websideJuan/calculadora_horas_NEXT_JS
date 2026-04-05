const date = {
  dateObject: new Date(),
  daysOfWeek: [
    'domingo',
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado'
  ],
  months: [
    "diciembre",
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
  ],
  dayWeekName: function() {
    return this.daysOfWeek[this.dateObject.getDay()]
  },
  
}

const getDayOfWeekName = () => {
  return date.daysOfWeek[date.dayWeekName()]
}

const getCurrentDay = () => {
  return date.dateObject.getDate()
}

const getCurrentMonth = () => {
  return (date.dateObject.getMonth() + 1)
}


const getCompleteDate = () => {
  const currentDay = getCurrentDay()
  const currentMonth = getCurrentMonth()

  if (currentMonth < 10) {
    return (`2026-0${currentMonth}-0${currentDay}`)
  } else {
    return (`2026${currentMonth}-${currentDay}`)
  }
}

export {
  getDayOfWeekName,
  getCurrentDay,
  getCompleteDate,
  getCurrentMonth,
  date
}