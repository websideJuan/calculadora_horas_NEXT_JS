import { getCompleteDate } from "./date.js";

const guides = [
  {
    numbOfGuide: "012345",
    operario: "Juan Herrera",
    date: { day: 21, month: 3 },
    lugar: "Metrica",
    totalHoursWorked: 3,
    precioHora: "Normales",
  },
  {
    numbOfGuide: "012346",
    operario: "Juan Herrera",
    date: { day: 22, month: 3 },
    lugar: "Marcelino",
    totalHoursWorked: 2,
    precioHora: "Normales",
  },
  {
    numbOfGuide: "012347",
    operario: "Juan Herrera",
    date: { day: 24, month: 3 },
    lugar: "Metrica",
    totalHoursWorked: 6,
    precioHora: "Normales",
  },
  {
    numbOfGuide: "012348",
    operario: "Juan Herrera",
    date: { day: 25, month: 3 },
    lugar: "ejemplo4",
    totalHoursWorked: 2,
    precioHora: "Extras",
  },
  {
    numbOfGuide: "012349",
    operario: "Juan Herrera",
    date: { day: 26, month: 3 },
    lugar: "ejemplo5",
    totalHoursWorked: 2,
    precioHora: "Extras",
  },
  {
    numbOfGuide: "012350",
    operario: "Juan Herrera",
    date: { day: 24, month: 3 },
    lugar: "ejemplo6",
    totalHoursWorked: 6,
    precioHora: "Extras",
  },
  {
    numbOfGuide: "012351",
    operario: "Juan Herrera",
    date: { day: 28, month: 3 },
    lugar: "ejemplo7",
    totalHoursWorked: 2,
    precioHora: "S.Extras",
  },
  {
    numbOfGuide: "012352",
    operario: "Juan Herrera",
    date: { day: 29, month: 3 },
    lugar: "ejemplo8",
    totalHoursWorked: 14,
    precioHora: "S.Extras",
  },
  {
    numbOfGuide: "012353",
    operario: "Juan Herrera",
    date: { day: 31, month: 3 },
    lugar: "ejemplo9",
    totalHoursWorked: 3,
    precioHora: "S.Extras",
  },
];

export const registerGuides = async (formData) => {
  try {
    const guide = {};

    guide.numbOfGuide = formData.get("numeroDeGuia");
    guide.startHours = formData.get("horaInicio");
    guide.endTime = formData.get("horaTermino");
    guide.arrivalTime = formData.get("horaLLegada");
    guide.numbMachine = formData.get("numeroMaquina");
    guide.totalHoursWorked = Number(formData.get("totalHorasTrabajadas"));

    Number(guide.arrivalTime.replace(':', '.')) < 18.30 && Number(guide.arrivalTime.replace(':', '.')) < 22.00 ? console.log('Extra') : console.log('Normal');
    ;
    

    const currentDay = formData.get("cuantosDias");

    currentDay
      ? (guide.selectDay = {
          startDate: formData.get("diaInicio"),
          endDate: formData.get("diaFinal"),
        })
      : (guide.currentDay = getCompleteDate());

    guides.push(guide);
    console.log(guides);

    return {
      success: true,
    };
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
};

export const getGuides = (numbOfGuide) => {
  try {
    const data = guides;

    if (numbOfGuide) {
      return {
        success: true,
        guides: data.filter((guide) => guide.numbOfGuide === numbOfGuide),
      };
    }

    return {
      success: true,
      guides: data,
    };
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
};

class Hours {
  totalHours = {};
  normalHours = {};
  extraHours = {};
  superExtraHours = {};
  sanFrancisco = {};
  timeLine = {
    startDay: 24,
    startMonth: 2 - 1,
    startYear: 2026,
    endDay: 24,
    endMonth: 2,
    endYear: 2026,
    getFullPeriod: function () {
      return {
        startPeriod: `${this.startDay}/${this.startMonth}/${this.startYear}`,
        endPeriod: `${this.endDay}/${this.endMonth}/${this.endYear}`,
      };
    },
  };

  constructor() {
    this.init();
  }

  init() {
    this.createTotalHours();
    this.createNormalHours();
    this.createExtraHours();
    this.createSuperExtraHours();
    this.createSanFranciscoHours();
  }

  createTotalHours() {
    this.totalHours = {
      total: this.totalHoursReduce(guides),
      guides: guides,
      totalGuides: guides.length,
    };
  }

  createExtraHours() {
    this.extraHours = {
      total: this.totalHoursReduce(this.filterGuidesForPriceHours("Extras")),
      guides: this.filterGuidesForPriceHours("Extras"),
      totalGuides: this.filterGuidesForPriceHours("Extras").length,
    };
  }

  createNormalHours() {
    this.normalHours = {
      total: this.totalHoursReduce(this.filterGuidesForPriceHours("Normales")),
      guides: this.filterGuidesForPriceHours("Normales"),
      totalGuides: this.filterGuidesForPriceHours("Normales").length,
    };
  }

  createSuperExtraHours() {
    this.superExtraHours = {
      total: this.totalHoursReduce(this.filterGuidesForPriceHours("S.Extras")),
      guides: this.filterGuidesForPriceHours("S.Extras"),
      totalGuides: this.filterGuidesForPriceHours("S.Extras").length,
    };
  }

  createSanFranciscoHours() {
    this.sanFrancisco = {
      total: this.totalHoursReduce(this.filterGuidesForPriceHours("S.F")),
      guides: this.filterGuidesForPriceHours("S.F"),
      totalGuides: this.filterGuidesForPriceHours("S.F").length,
    };
  }

  filterGuidesForPriceHours(priceHours) {
    return guides.filter((guide) => guide.precioHora === priceHours);
  }

  totalHoursReduce(guides) {
    return guides.reduce(
      (acumulador, valorActual) => acumulador + valorActual.totalHoursWorked,
      0,
    );
  }
}

export const hours = new Hours();
