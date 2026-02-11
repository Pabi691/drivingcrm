import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { learnersData } from '../data/dummy';
import Doughnut from '../components/Charts/Pie';
import { useStateContext } from '../contexts/ContextProvider';

const LearnerProfilePage = () => {
  const { learners } = useStateContext()

  const { id } = useParams();

  const learner = learners.find(
    (l) => l._id === id
  );
  useEffect(() => {
    console.log('learners', learner)
  }, [learner])

  // 🔒 Safety check FIRST
  // if (!learner) {
  //   return <Navigate to="/learners" replace />;
  // }

  // 📊 Chart Data
  const lessonChartData = [
    { x: 'Completed', y: learner?.LessonsCompleted, text: `${learner?.LessonsCompleted}` },
    {
      x: 'Remaining',
      y: learner?.LessonsBooked - learner?.LessonsCompleted,
      text: `${learner?.LessonsBooked - learner?.LessonsCompleted}`,
    },
  ];

  const paymentChartData = [
    { x: 'Paid', y: learner?.PaymentStatus === 'Paid' ? 1 : 0, text: 'Paid' },
    {
      x: 'Pending / Overdue',
      y: learner?.PaymentStatus !== 'Paid' ? 1 : 0,
      text: learner?.PaymentStatus,
    },
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
        {learner.ProfileImage ? <img
          src={learner?.ProfileImage}
          alt={learner?.Name}
          className="w-20 h-20 rounded-full object-cover"
        /> : <div className='w-20 h-20 rounded-full flex justify-center items-center bg-[#03C9D7] text-3xl text-white '>{learner.full_name.charAt(0)}</div>}
        <div>
          <h1 className="text-2xl font-bold">{learner?.Name}</h1>
          <p className="text-gray-500 text-sm">Pupil Id #{learner?._id}</p>
          <p className="text-sm text-gray-600">{learner?.Email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* INFO */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4">Pupil Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <Info label="Name" value={learner?.full_name} />

              <Info label="Phone" value={learner?.phone} />
              <Info label="Instructor" value={learner?.instructor_id.name} />
              <Info label="Email" value={learner?.email} />
              {/* <Info label="Test Date" value={learner?.TestDate} />
              <Info label="Zone" value={learner?.Zone} />
              <Info label="Postcode" value={learner?.Postcode} />
              <Info label="Country" value={learner?.Country} />
              <Info label="Auto Pay" value={learner?.AutoPay} />
              <Info label="Payment Method" value={learner?.PaymentMethod} />
              <Info label="Theory Test" value={learner?.TheoryTestPassed} /> */}
            </div>
          </div>

          {/* PROGRESS */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-3">Pupil Progress</h3>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${learner?.ProgressPercentage}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 mt-2">
              {learner?.ProgressPercentage}% completed
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Booked" value={learner?.LessonsBooked} />
            <Stat label="Completed" value={learner?.LessonsCompleted} />
            <Stat label="Cancelled" value={learner?.LessonsCancelled} />
            <Stat label="Hours" value={learner?.TotalHours} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* LESSON CHART */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold text-center mb-2">Payment  Overview</h3>
            <Doughnut
              id="lesson-chart"
              data={lessonChartData}
              legendVisiblity
              height="250px"
            />
          </div>

          {/* PAYMENT */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow text-sm">
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <p>Status: <strong>{learner?.PaymentStatus}</strong></p>
            <p>Total Spent: {learner?.TotalSpent}</p>
            <p>Outstanding: {learner?.OutstandingBalance}</p>
          </div>

          {/* PAYMENT CHART */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold text-center mb-2">Payment Status</h3>
            <Doughnut
              id="payment-chart"
              data={paymentChartData}
              legendVisiblity
              height="220px"
            />
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
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default LearnerProfilePage;
