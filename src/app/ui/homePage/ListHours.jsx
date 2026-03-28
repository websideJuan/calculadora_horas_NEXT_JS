"use client";
import { useEffect, useState } from "react";
import { getGuides } from "@/app/lib/data";

export function ListHours({ handleClick }) {
  const [dataGuide, setDataGuide] = useState([]);
  const [controlHours, setControlHours] = useState("totalHours");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await getGuides();
        setDataGuide(response.guides);
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, []);

  const handleControlHours = (e) => {
    const id = e.target.dataset.id;
    const allLiElements =
      e.target.parentElement.querySelectorAll("li[data-id]");

    allLiElements.forEach((liChildElement) => {
      if (liChildElement.dataset.id === id) {
        allLiElements.forEach((liChildElement) => {
          liChildElement.classList.replace("bg-cyan-800", "bg-white");
          liChildElement.classList.replace("px-6", "px-3");
          liChildElement.classList.remove("text-white");
        });
        if (liChildElement.classList.contains("bg-cyan-800")) {
          liChildElement.classList.replace("bg-cyan-800", "bg-white");
          liChildElement.classList.replace("px-6", "px-3");
          liChildElement.classList.remove("text-white");
          return;
        }

        liChildElement.classList.replace("bg-white", "bg-cyan-800");
        liChildElement.classList.replace("px-3", "px-6");
        liChildElement.classList.add("text-white");
      }
    });

    setControlHours(id);
  };

  const hours = {
    guides: dataGuide,
    totalHours: {},
    normalHours: {},
    extraHours: {},
    superExtraHours: {},
    sanFrancisco: {},
    timeLine: {
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
    },

    init() {
      this.createTotalHours();
      this.createNormalHours();
      this.createExtraHours();
      this.createSuperExtraHours();
      this.createSanFranciscoHours();
    },

    createTotalHours() {
      this.totalHours = {
        total: this.totalHoursReduce(this.guides),
        guides: this.guides,
        totalGuides: this.guides.length,
      };
    },

    createExtraHours() {
      this.extraHours = {
        total: this.totalHoursReduce(this.filterGuidesForPriceHours("Extras")),
        guides: this.filterGuidesForPriceHours("Extras"),
        totalGuides: this.filterGuidesForPriceHours("Extras").length,
      };
    },

    createNormalHours() {
      this.normalHours = {
        total: this.totalHoursReduce(
          this.filterGuidesForPriceHours("Normales"),
        ),
        guides: this.filterGuidesForPriceHours("Normales"),
        totalGuides: this.filterGuidesForPriceHours("Normales").length,
      };
    },

    createSuperExtraHours() {
      this.superExtraHours = {
        total: this.totalHoursReduce(
          this.filterGuidesForPriceHours("S.Extras"),
        ),
        guides: this.filterGuidesForPriceHours("S.Extras"),
        totalGuides: this.filterGuidesForPriceHours("S.Extras").length,
      };
    },

    createSanFranciscoHours() {
      this.sanFrancisco = {
        total: this.totalHoursReduce(this.filterGuidesForPriceHours("S.F")),
        guides: this.filterGuidesForPriceHours("S.F"),
        totalGuides: this.filterGuidesForPriceHours("S.F").length,
      };
    },

    filterGuidesForPriceHours(priceHours) {
      return this.guides?.filter((guide) => guide.type_price === priceHours);
    },
    totalHoursReduce(guides) {
      return guides.reduce(
        (acumulador, valorActual) => acumulador + valorActual.total_hours_worked,
        0,
      );
    },
  };

  hours.init();
  

  

  return (
    <div className="max-w-lg mx-auto w-full overflow-scroll">
      <div className="flex flex-col">
        <ul className="flex justify-start overflow-x-scroll">
          <li
            className="bg-cyan-800 text-white px-6 text-nowrap transition-all py-2"
            data-id="totalHours"
            onClick={handleControlHours}
          >
            Totales
          </li>
          <li
            className="bg-white px-3 text-nowrap transition-all py-2"
            data-id="normalHours"
            onClick={handleControlHours}
          >
            Normales
          </li>
          <li
            className="px-3 text-nowrap bg-white transition-all py-2"
            data-id="extraHours"
            onClick={handleControlHours}
          >
            Extras:
          </li>
          <li
            className="px-3 text-nowrap bg-white transition-all py-2"
            data-id="superExtraHours"
            onClick={handleControlHours}
          >
            S. Extra
          </li>
          <li
            className="px-3 text-nowrap bg-white transition-all py-2"
            data-id="sanFrancisco"
            onClick={handleControlHours}
          >
            San francisco
          </li>
        </ul>

        <div className="bg-cyan-800 p-5 text-white flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="text-4xl">🗓️</div>
            <div>
              <p className="text-2xl">Horas: {hours[controlHours].total}</p>
              <span>Guias: {hours[controlHours].totalGuides}</span>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <span className="col-span-1 font-semibold bg-cyan-950 p-2">
              Orden.
            </span>
            <span className="col-span-1 font-semibold bg-cyan-950 p-2">
              Tipo.
            </span>
            <span className="col-span-1 font-semibold bg-cyan-950 p-2">
              Horas
            </span>
            <span className="col-span-1 font-semibold bg-cyan-950 p-2">
              Cliente
            </span>
            {
              isLoading 
              ?<>
                <div className="col-span-4 grid grid-cols-4 gap-4 mb-4">
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                </div>
                <div className="col-span-4 grid grid-cols-4 gap-4 mb-4">
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                </div> 
                <div className="col-span-4 grid grid-cols-4 gap-4 mb-4">
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                </div> 
                <div className="col-span-4 grid grid-cols-4 gap-4 mb-4">
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                  <span className="col-span-1 p-2 py-4 animate-pulse bg-gray-400"></span>
                </div> 
              </> 
              : hours[controlHours].guides.map((guia) => (
                  <div
                    className="col-span-4 grid grid-cols-4 divide-x"
                    key={guia.numb_of_guide}
                  >
                    <span className="col-span-1 p-2">{guia.numb_of_guide}</span>
                    <span className="col-span-1 p-2">{guia.type_price}</span>
                    <span className="col-span-1 p-2">
                      {guia.total_hours_worked}
                      {" hrs"}
                    </span>
                    <span className="col-span-1 p-2">{guia.enterprise}</span>
                  </div>
                ))

            }
          </div>
          <button
            className="bg-emerald-500 uppercase px-4 py-3 text-white rounded-3xl ms-auto"
            onClick={handleClick}
          >
            Agregar guia
          </button>
        </div>
      </div>
    </div>
  );
}
