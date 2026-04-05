"use client";
import { useState, useEffect } from "react";
import { getGuides } from "@/app/lib/data";


export function ListHours() {
  const [dataGuide, setDataGuide] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await getGuides();
        setDataGuide(response.guides);
      } catch (error) {
        setDataGuide([]);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dataGuide.length]);

  return (
    <div className="mt-6">
      <p className="text-gray-400 font-bold uppercase text-xs">
        Ultimos trabajos
      </p>

      <div className="divide-y divide-gray-500 text-white">
        {dataGuide
          ?.map((guide, i) =>  i < 3 && (
            <div key={guide.num_of_guide} className="py-4">
              <div className="flex items-center justify-between rounded-2xl bg-zinc-600/20 px-4 py-3 ">
                <div className="w-10 h-10 border border-amber-400 rounded-full ">
                  <div className="flex justify-center items-center h-full">
                    <span className="text-xs">
                      {guide.enterprise[0]} {i+1}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-sm me-auto ms-2">
                  <div className="flex items-center gap-2">
                    <p className="text-amber-400 uppercase font-bold">
                      {guide.enterprise.length < 5
                        ? guide.enterprise
                        : guide.enterprise.slice(0, 5).concat("...")}
                    </p>{" "}
                    /
                    <span className="border border-gray-500 py-px px-2 rounded-2xl">
                      N° Guía {guide.num_of_guide}
                    </span>
                  </div>
                  <div className="space-x-4">
                    <span>Horas: {guide.total_hours_worked}</span>
                    <span>Fecha: {new Date(dataGuide[0]?.date_guide).toLocaleDateString()}</span>
                    <span>Grúa: 45</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
