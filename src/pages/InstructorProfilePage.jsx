import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MdAccessTime } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import Doughnut from '../components/Charts/Pie';
import toast from 'react-hot-toast';
import Scheduler from './Calendar';

const InstructorProfilePage = () => {
  const { id } = useParams();
  const { instructors, approvedInstructor, fetchInstructors ,fetchInstructorWorkingDays,fetchInstructorWorkingHours} = useStateContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const[workingDays, setWorkingDays]=useState([])

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
 const DAY_MAP = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};


useEffect(() => {
  const getWorkingDays = async () => {
    try {
      setLoading(true);
      // fetch working days array
      const res = await fetchInstructorWorkingDays(id); // returns array like you showed
      const days = Array.isArray(res) ? res : res.data || [];

      // fetch hours for each working day
      const daysWithHours = await Promise.all(
        days.map(async (day) => {
          if (Number(day.is_working) === 1) {
            // fetch hours for this day
            const hours = await fetchInstructorWorkingHours(id);
            return { ...day, hours };
          }
          return day; // day off
        })
      );

      setWorkingDays(daysWithHours);
    } catch (error) {
      console.error('Error fetching working days', error);
    } finally {
      setLoading(false);
    }
  };

  if (id) getWorkingDays();
}, [id]);


useEffect(()=>{
console.log('working days',workingDays)
},[workingDays])


const activeDays = workingDays?.filter(
  d => Number(d.is_working) === 1
);


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

        <div className='flex gap-16'>
          <div className="mt-6 ">
            <h3 className="font-semibold mb-2">Instructor Bio</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{instructor.instructor_bio}</p>
          </div>
          {!instructor.status == 1 && <button
            className="
    mt-4
    inline-flex items-center gap-2
    rounded-xl
    bg-[#03C9D7]
    px-6 py-1
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
<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4">
  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
    Weekly Availability
  </h3>

  {workingDays.length === 0 ? (
    <p className="text-sm text-gray-500 dark:text-gray-400">No working days found</p>
  ) : (
    <div className="grid grid-cols-1  gap-4">
      {workingDays.map((day) => {
        const dayHours = day.hours && day.hours.length > 0 ? day.hours[0] : null;

        return (
          <div
            key={day._id}
            className={`flex flex-col justify-between p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-200
              ${Number(day.is_working) === 1
                ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-700'
              }`}
          >
            {/* Day Name & Status */}
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                {DAY_MAP[day.day_of_week]}
              </p>
              {Number(day.is_working) === 1 ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-200">
                  Working
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-300">
                  Day Off
                </span>
              )}
            </div>

            {/* Work Hours */}
            {Number(day.is_working) === 1 && dayHours && (
              <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-200">
                <p className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="font-medium">Work:</span> {dayHours.start_time} – {dayHours.end_time}
                </p>

                {dayHours.break_start && dayHours.break_end && (
                  <p className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="font-medium">Break:</span> {dayHours.break_start} – {dayHours.break_end}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  )}
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
