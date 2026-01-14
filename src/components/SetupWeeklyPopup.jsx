import React, { useState } from "react";
import toast from "react-hot-toast";

const DAY_MAP = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const WeeklyAvailability = ({ initialData = {}, onSave }) => {
  const [showSetup, setShowSetup] = useState(false);
  const [availability, setAvailability] = useState({
    1: { enabled: false, workStart: "09:00", workEnd: "17:00", breakStart: "13:00", breakEnd: "14:00" },
    2: { enabled: false, workStart: "10:00", workEnd: "18:00", breakStart: "", breakEnd: "" },
    3: { enabled: false },
    4: { enabled: false, workStart: "11:00", workEnd: "19:00", breakStart: "", breakEnd: "" },
    5: { enabled: false, workStart: "09:00", workEnd: "15:00", breakStart: "", breakEnd: "" },
    6: { enabled: false },
    7: { enabled: false },
    ...initialData,
  });

  const handleSave = () => {
    console.log("Saved Availability:", availability);
    onSave?.(availability);
    toast.success("Availability saved");
    setShowSetup(false);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
       

        <button
          onClick={() => setShowSetup(true)}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Setup
        </button>
      </div>

      {/* SETUP MODAL */}
      {showSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]">

            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Setup Weekly Availability
            </h2>

            <div className="space-y-4">
              {Object.entries(DAY_MAP).map(([dayNumber, dayName]) => {
                const day = availability[dayNumber] || { enabled: false };

                return (
                  <div key={dayNumber} className="border rounded-xl p-4 dark:border-gray-700">
                    {/* Day Header */}
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-700 dark:text-gray-200">
                        {dayName}
                      </p>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={day.enabled}
                          onChange={() =>
                            setAvailability(prev => ({
                              ...prev,
                              [dayNumber]: { ...prev[dayNumber], enabled: !day.enabled },
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                      </label>
                    </div>

                    {/* Time Inputs */}
                    {day.enabled && (
                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        {[
                          ["Work Start", "workStart"],
                          ["Work End", "workEnd"],
                          ["Break Start", "breakStart"],
                          ["Break End", "breakEnd"],
                        ].map(([label, key]) => (
                          <div key={key}>
                            <label className="block text-gray-500">{label}</label>
                            <input
                              type="time"
                              value={day[key] || ""}
                              onChange={(e) =>
                                setAvailability(prev => ({
                                  ...prev,
                                  [dayNumber]: { ...prev[dayNumber], [key]: e.target.value },
                                }))
                              }
                              className="w-full mt-1 rounded-lg border px-3 py-2"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSetup(false)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeeklyAvailability;
