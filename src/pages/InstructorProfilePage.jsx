import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MdAccessTime } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import Doughnut from '../components/Charts/Pie';
import Scheduler from './Calendar';

const InstructorProfilePage = () => {
  const { id } = useParams();
  const { instructors } = useStateContext();

  // Find instructor by _id
  const instructor = instructors.find(
    (i) => i._id === id,
  );

  if (!instructor) {
    return <Navigate to="/instructors" replace />;
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${instructor.Postcode}, ${instructor.Country}`,
  )}&output=embed`;

  if (!instructor) {
    return <Navigate to="/instructors" replace />;
  }

  // 📊 Chart Data (e.g., Lessons Completed vs Remaining)
  const lessonChartData = [
    { x: 'Completed', y: instructor.LessonsCompleted, text: `${instructor.LessonsCompleted}` },
    { x: 'Remaining', y: instructor.LessonsBooked - instructor.LessonsCompleted, text: `${instructor.LessonsBooked - instructor.LessonsCompleted}` },
  ];

  const conversionChartData = [
    { x: 'Converted', y: instructor.ConversionRate, text: `${instructor.ConversionRate}%` },
    { x: 'Not Converted', y: 100 - instructor.ConversionRate, text: `${100 - instructor.ConversionRate}%` },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      <button
        type="button"
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow flex-col items-center gap-4">
        <div className='flex items-center justify-between gap-4'>
          <div className="flex gap-6 items-center">
            {/* <img
              src={instructor?.ProfileImage}
              alt={instructor.name}
              className="w-20 h-20 rounded-full object-cover"
            /> */}
            <div>
              <h1 className="text-2xl font-bold">{instructor.name}</h1>
              {/* <p className="text-gray-500 text-sm">{instructor.Designation} Instructor</p> */}
              <p className="text-sm text-gray-600">{instructor.email}</p>
              <p className="text-sm text-gray-600">{instructor.mobile}</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Location</h3>
            {/* <p className="text-sm text-gray-600">Zone {instructor.Zone}</p>
            <p className="text-sm text-gray-600">{instructor.Postcode}</p>
            <p className="text-sm text-gray-600">{instructor.Country}</p> */}
            <p className="text-sm text-gray-600">{instructor.full_address}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Instructor Bio</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{instructor.instructor_bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* SCHEDULER */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-5">Scheduler</h3>
            <Scheduler instructorId={instructor._id} />
          </div>

          {/* STATS */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Pupils" value={instructor.PupilCount} />
            <Stat label="Pass Rate" value={`${instructor.PassRate}%`} />
            <Stat label="Lessons Completed" value={instructor.LessonsCompleted} />
            <Stat label="Conversion Rate" value={`${instructor.ConversionRate}%`} />
          </div> */}

          {/* LESSON PROGRESS */}
          {/* <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-3">Lessons Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${(instructor.LessonsCompleted / instructor.LessonsBooked) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {((instructor.LessonsCompleted / instructor.LessonsBooked) * 100).toFixed(0)}% completed
            </p>
          </div> */}

        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* INFO */}
          {/* <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-5">Weekly Availability</h3>

            <div className="space-y-3">
              {Object.entries(instructor.Availability).map(([day, info]) => (
                <div
                  key={day}
                  className={`flex items-center justify-between rounded-xl p-4 border
          ${info.available
                      ? 'bg-gray-50 dark:bg-main-dark-bg border-gray-200 dark:border-gray-700'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                    }`}
                >
                  <div>
                    <p className="font-medium">{day}</p>
                    {!info.available && (
                      <p className="text-xs text-red-500 mt-1">Day Off</p>
                    )}
                  </div>

                  {info.available && (
                    <div className="text-right text-sm">
                      <p className="font-semibold flex items-center justify-end gap-1">
                        <MdAccessTime />
                        {info.start} – {info.end}
                      </p>

                      {info.break && (
                        <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs
                bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-300">
                          Break {info.break.start} – {info.break.end}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div> */}

          {/* LESSON CHART */}
          {/* <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold text-center mb-2">Lessons Overview</h3>
            <Doughnut
              id="lesson-chart"
              data={lessonChartData}
              legendVisiblity
              height="250px"
            />
          </div> */}

          {/* CONVERSION CHART */}
          {/* <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold text-center mb-2">Conversion Rate</h3>
            <Doughnut
              id="conversion-chart"
              data={conversionChartData}
              legendVisiblity
              height="220px"
            />
          </div> */}

          {/* LOCATION */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-2">Instructor Location</h3>

            {/* <iframe
              title="Instructor Location"
              src={mapSrc}
              className="w-full h-60 rounded-lg border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            /> */}
          </div>

          {/* FINANCIAL SUMMARY */}
          {/* <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow text-sm">
            <h3 className="font-semibold mb-3">Monthly Summary</h3>
            <p>Income: {instructor.IncomeMonth}</p>
            <p>Expenses: {instructor.ExpensesMonth}</p>
            <p>Franchise Fee: {instructor.FranchiseFee}</p>
          </div> */}

          {/* DOCUMENTS */}
          {/* <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow text-sm">
            <h3 className="font-semibold mb-3">Documents</h3>
            <p>ADI Expiry: {instructor.ADIExpiry}</p>
            <p>PDI Expiry: {instructor.PDIExpiry}</p>
            <p>Insurance: {instructor.InsuranceExpiry}</p>
            <p>MOT: {instructor.MOTExpiry}</p>
          </div> */}

          {/* STATUS */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">Status</h3>
            <span className={`px-3 py-1 rounded-full text-sm
              ${instructor.status === 1
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
              }`}>
              {instructor.status === 1 ? 'Active' : instructor.status === 0 ? 'Inactive' : instructor.status}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= HELPERS ================= */

// const Info = ({ label, value }) => (
//   <div>
//     <p className="text-gray-500 text-xs">{label}</p>
//     <p className="font-medium">{value}</p>
//   </div>
// );

const Stat = ({ label, value }) => (
  <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow text-center">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

export default InstructorProfilePage;
