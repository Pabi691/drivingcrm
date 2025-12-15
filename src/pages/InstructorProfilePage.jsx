import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { instructorsData } from '../data/dummy';
import Doughnut from '../components/Charts/Pie';

const InstructorProfilePage = () => {
  const { id } = useParams();

  const instructor = instructorsData.find(
    (i) => i.InstructorID === Number(id),
  );

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
      <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow flex items-center gap-4">
        <img
          src={instructor.ProfileImage}
          alt={instructor.Name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{instructor.Name}</h1>
          <p className="text-gray-500 text-sm">{instructor.Designation} Instructor</p>
          <p className="text-sm text-gray-600">Zone {instructor.Zone} · {instructor.Postcode}</p>
          <p className="text-sm text-gray-600">{instructor.Email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* INFO */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4">Instructor Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <Info label="Phone" value={instructor.Phone} />
              <Info label="Availability" value={instructor.Availability} />
              <Info label="Days Off" value={instructor.DaysOff} />
              <Info label="Zone" value={instructor.Zone} />
              <Info label="Postcode" value={instructor.Postcode} />
              <Info label="Country" value={instructor.Country} />
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Pupils" value={instructor.PupilCount} />
            <Stat label="Pass Rate" value={`${instructor.PassRate}%`} />
            <Stat label="Lessons Completed" value={instructor.LessonsCompleted} />
            <Stat label="Conversion Rate" value={`${instructor.ConversionRate}%`} />
          </div>

          {/* LESSON PROGRESS */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
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
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* LESSON CHART */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold text-center mb-2">Lessons Overview</h3>
            <Doughnut
              id="lesson-chart"
              data={lessonChartData}
              legendVisiblity
              height="250px"
            />
          </div>

          {/* CONVERSION CHART */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold text-center mb-2">Conversion Rate</h3>
            <Doughnut
              id="conversion-chart"
              data={conversionChartData}
              legendVisiblity
              height="220px"
            />
          </div>

          {/* LOCATION */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-2">Instructor Location</h3>

            <iframe
              title="Instructor Location"
              src={mapSrc}
              className="w-full h-60 rounded-lg border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* FINANCIAL SUMMARY */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow text-sm">
            <h3 className="font-semibold mb-3">Monthly Summary</h3>
            <p>Income: {instructor.IncomeMonth}</p>
            <p>Expenses: {instructor.ExpensesMonth}</p>
            <p>Franchise Fee: {instructor.FranchiseFee}</p>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow text-sm">
            <h3 className="font-semibold mb-3">Documents</h3>
            <p>ADI Expiry: {instructor.ADIExpiry}</p>
            <p>PDI Expiry: {instructor.PDIExpiry}</p>
            <p>Insurance: {instructor.InsuranceExpiry}</p>
            <p>MOT: {instructor.MOTExpiry}</p>
          </div>

          {/* STATUS */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-2">Status</h3>
            <span className={`px-3 py-1 rounded-full text-sm
              ${instructor.OnLeave === 'No'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
                }`}>
              {instructor.OnLeave === 'No' ? 'Active' : instructor.OnLeave}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= HELPERS ================= */

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow text-center">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

export default InstructorProfilePage;
