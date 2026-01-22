import React from "react";

const DAY_MAP = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const WeeklyAvailabilityList = ({workingDays  = [] }) => {
  // show only working days




  if (workingDays.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        No working days configured
      </p>
    );
  }

  return (
  
          <div className="grid grid-cols-1 gap-4">
            {workingDays.map((day) => (
              <div
                key={day._id}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    {DAY_MAP[day.day_of_week]}
                  </p>

                 {day.is_working===1 && day.start_time ? <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    Working
                  </span>:<span className="text-xs font-medium text-white  bg-red-400 px-3 py-1 rounded-full">
                    Leave
                  </span>}
                </div>

                {/* Work Time */}
                {day.is_working===1  && day.start_time ? <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    <strong className="text-gray-700 dark:text-gray-300">
                      Work:
                    </strong>{" "}
                    {day.start_time} – {day.end_time}
                  </p>

                  {/* Break Time (ONLY IF EXISTS) */}
                  {day.break_start && day.break_end && (
                    <p>
                      <strong className="text-gray-700 dark:text-gray-300">
                        Break:
                      </strong>{" "}
                      {day.break_start} – {day.break_end}
                    </p>
                  )}
                </div>:<div></div>}
               
              </div>
            ))}
          </div>
  );
};

export default WeeklyAvailabilityList;
