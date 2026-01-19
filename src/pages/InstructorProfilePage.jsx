import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MdAccessTime } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import Doughnut from '../components/Charts/Pie';
import toast from 'react-hot-toast';
import Scheduler from './Calendar';
import WeeklyAvailability from '../components/SetupWeeklyPopup';
import WeeklyAvailabilityList from '../components/InstructorWeeklyDisplay';

const InstructorProfilePage = () => {
  const { id } = useParams();
  const { instructors, approvedInstructor, fetchInstructors, fetchInstructorWorkingDays, IsUpdate, fetchInstructorWorkingHours } = useStateContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [workingDays, setWorkingDays] = useState([])


  // dummy data 


  // Find instructor by _id
  const instructor = instructors.find(
    (i) => i._id === id,
  );

  // click approve function 
  function OpenClick(value) {
    setOpen(value)
  }
  // approving instructor
  async function handleConfirm() {
    try {
      console.log('clicking')
      setLoading(true)
      const res = await approvedInstructor(instructor._id);
      console.log('res', res)
      if (res.success === true) {
        toast.success(res.message);
        fetchInstructors()
        setIsApproved(true)
      }
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
      setIsApproved(false)

    }
  }
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


  useEffect(() => {
    const getWorkingDays = async () => {
      setLoading(true);
      const res = await fetchInstructorWorkingDays(id);
      setWorkingDays(res || []);
      setLoading(false);
    };

    if (id) getWorkingDays();
  }, [id, IsUpdate]);

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

        <div className='flex  items-center justify-between   gap-16'>
          <div className="mt-6 ">
            <h3 className="font-semibold mb-2">Instructor Bio</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{instructor.instructor_bio}</p>
          </div>
          {!instructor.status == 1 && <button
            className="
    mt-4
    inline-flex items-start gap-2
    rounded-xl
    bg-[#03C9D7]
    px-6 py-3
    text-sm font-semibold text-white
    shadow-lg shadow-[#03C9D7]
    transition-all duration-300
    hover:scale-105 
    active:scale-95
  "
            onClick={() => OpenClick(true)}
          >
            Approve Instructor
          </button>}
        </div>
        {open && !isApproved && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

              {/* Header */}
              <h2 className="text-xl font-bold text-gray-800">
                Confirm Instructor Approval
              </h2>

              {/* Message */}
              <p className="mt-3 text-sm text-gray-600">
                Are you sure you want to approve this instructor and add them to
                your business?
                <span className="block mt-2 font-medium text-gray-700">
                  This action cannot be undone.
                </span>
              </p>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="
                  rounded-lg border border-gray-300
                  px-4 py-2 text-sm font-medium text-gray-700
                  hover:bg-gray-100
                "
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="
                  rounded-lg
                  bg-green-600
                  px-5 py-2 text-sm font-semibold text-white
                  shadow-md
                  transition
                  hover:bg-green-700
                  disabled:opacity-60
                "
                >
                  {loading ? 'Approving...' : "Yes, Approve"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      {instructor.status === 1 && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* SCHEDULER */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-5">Scheduler</h3>
            <Scheduler instructorId={instructor._id} />
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Pupils" value={instructor.PupilCount} />
            <Stat label="Pass Rate" value={`${instructor.PassRate ? instructor.PassRate : 30}%`} />
            <Stat label="Lessons Completed" value={instructor.LessonsCompleted ? instructor.LessonsCompleted : 40} />
            <Stat label="Conversion Rate" value={`${instructor.ConversionRate ? instructor.ConversionRate : 50}%`} />
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
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Weekly Availability
            </h3>

            <WeeklyAvailability instructor={id} workingDays={workingDays} />
            {/* 
            <button
              onClick={() => setShowSetup(true)}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Setup
            </button> */}
          </div>


          <WeeklyAvailabilityList workingDays={workingDays} />

        </div>


      </div>}

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
