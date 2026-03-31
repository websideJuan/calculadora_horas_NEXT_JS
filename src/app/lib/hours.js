import { getGuides } from "./data";

const guides = await getGuides();


export const hours = {
  date: new Date(),
  guides: guides,
  hours: [
    {
      totalNormalHours: 0,
      totalExtraHours: 0,
      totalSuperExtraHours: 0,
    },
  ],
  timeLine: {
    dayFinalyPeriod: 24,
    currentDay: "",
    currentYear: "",
    startMonth: "",
    endMonth: "",
    getFullPeriod: function () {
      return {
        startPeriod: `${this.dayFinalyPeriod}/0${this.startMonth}`,
        endPeriod: `${this.dayFinalyPeriod}/0${this.endMonth}`,
      };
    },
  },

  init() {
    this.createPeriod();
    this.createHours()
  },

  createHours () {
    const totalHoursNormal = this.guides.guides.filter(guide => guide.type_price === 'Normales').reduce((curr, acc) => curr + acc.total_hours_worked, 0)
    const totalHoursExtras = this.guides.guides.filter(guide => guide.type_price === 'Extra').reduce((curr, acc) => curr + acc.total_hours_worked, 0)
    const totalHoursSuperExtras = this.guides.guides.filter(guide => guide.type_price === 'S.Extra').reduce((curr, acc) => curr + acc.total_hours_worked, 0)

    this.hours[0] = [totalHoursNormal, totalHoursExtras, totalHoursSuperExtras]
  },

  createPeriod() {
    this.timeLine.currentDay = this.date.getDate();
    this.timeLine.currentYear = this.date.getFullYear();
    if (this.timeLine.currentDay > this.timeLine.dayFinalyPeriod) {
      this.timeLine.startMonth = this.date.getMonth() + 1;
      this.timeLine.endMonth = this.timeLine.startMonth + 1;
    }
  },
};
