"use client";
import { useEffect, useState } from "react";
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
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="mt-6">
      <p className="text-gray-400 font-bold uppercase text-xs">Ultimos trabajos</p>

      <div className="divide-y divide-gray-600 text-white">
        {dataGuide.reverse().map((guide) => (
          <div key={guide.numb_of_guide} className="py-4">
            <div className="flex items-center justify-between rounded-2xl bg-zinc-600/20 px-4 py-3">
              <div className="w-10 h-10 border border-amber-400 rounded-full">
                <div className="flex justify-center items-center h-full">
                  <span className="text-xs">
                    {guide.enterprise[0]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-sm me-auto ms-2">
                <div className="flex gap-2">
                  <p className="text-amber-400 uppercase font-bold">Orden </p>
                  {guide.numb_of_guide}
                </div>
                <span>Horas: {guide.total_hours_worked}HRS</span>
              </div>
              <span>{guide.numbmachine}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
