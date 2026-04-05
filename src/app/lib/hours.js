"use client";

import { montserrat } from "../ui/fonts";
import { useEffect, useState } from "react";
import { getGuideForPeriod } from "./data";
import { Period } from "../ui/homePage/period";

export const Hours = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalHors, setTotalHour] = useState([]);
  const [datePeriod, setDate] = useState({
    periodDate: {
      init: "2026-03-24",
      end: "2026-04-24",
    },
  });

  useEffect(() => {
    async function fetchData(date) {
      try {
        setIsLoading(true);

        const period = await getGuideForPeriod(
          date.periodDate.init,
          date.periodDate.end
        );

        updateListTotalHours(period);
      } catch (error) {
        setTotalHour([]);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData(datePeriod);
  }, [datePeriod]);

  const updateListTotalHours = (lastListHours) => {
    const priceOfHours = [
      { typePrice: "normal_hour", price: 1400 },
      { typePrice: "extra_hour", price: 1400 },
      { typePrice: "super_extra_hour", price: 1400 },
    ];

    const ListHours = priceOfHours.map((filter, i) => {
      const listType = ['normal', 'extra', 'super extra']
      const newObj = {
        price: filter.price,
        type: listType[i]
      }

      newObj.totalHours = lastListHours.reduce(
        (acc, current) => {
          return acc + Number(current[filter.typePrice])
        },
        0,
      )

      console.log(newObj);
      return newObj
    })
    
    console.log(ListHours);
    
    setTotalHour(ListHours);
  };

  return (
    <div className="py-4">
      <div className="border-b border-b-amber-500 mb-4">
        <p className="text-gray-400 font-bold uppercase text-xs">Periodo</p>
        <div className="text-amber-500 flex justify-between">
          <Period setDate={setDate} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {totalHors?.map((total, i) => (
          <div
            key={i}
            className={`flex items-center justify-between text-white border-b border-amber-400 ${i === 1 ? "flex-row-reverse" : ""}`}
          >
            <div className="text-zinc-900 bg-amber-500 rounded-3xl w-40 ps-6 text-sm">
              <p>{total.type}</p>
              <p>Bono ${(total.totalHours * total.price).toLocaleString()}</p>
            </div>
            <div>
              <div className={`text-8xl ${montserrat.className}`}>
                <span>{total.totalHours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
