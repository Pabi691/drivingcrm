import React, { use, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { learnersData } from '../data/dummy';
import Doughnut from '../components/Charts/Pie';
import { useStateContext } from '../contexts/ContextProvider';

const LearnerProfilePage = () => {
  const { learners, fetchPupilsMoney, GetBooking, getPupilBookings } = useStateContext()
  const [MoneyHistory, setMoneyHistory] = useState([]);
  const [AllBookings, setBookings] = useState([]);
  const [Cancelled, setCancelled] = useState(0);
  const [Completed, setCompleted] = useState(0);
  const [AllUsedHour, setAllUsedHour] = useState([])
  const [TotalCreditUsed, setTotalCreditUsed] = useState(0);
  const [TotalPaymentPending, setTotalPaymentPending] = useState(0)
  const [PaidPaymentPercentage, setPaidPaymentPercentage] = useState(0)
  const [PendingPaymentPercentage, setPendingPaymentPercentage] = useState(0)

  const { id } = useParams();

  const learner = learners.find(
    (l) => l._id === id
  );


  // getAll Booking
  async function Bookings() {
    try {
      const res = await getPupilBookings(id);
      console.log('bookings', res);

      setBookings(res.data);
      const cancelled = res.data.filter((b) => b.status === 'cancelled');
      const completed = res.data.filter((b) => b.status === 'completed');


      const totalCreditUsed = res.data.reduce((sum, booking) => sum + booking.credit_use, 0);
      setTotalCreditUsed(totalCreditUsed)
      console.log('hours', totalCreditUsed);
      const pendings = res.data.filter((b) => b.payment_status === "pending")
      // total payment pending calculating

      const paid = res.data.filter((b) => b.payment_status === "completed");

      const totalPayments = res.data.length;

      const paidCount = paid.length;
      const pendingCount = pendings.length;

      const paidPayment = totalPayments > 0
        ? (paidCount / totalPayments) * 100
        : 0;

      const pendingPercentage = totalPayments > 0
        ? (pendingCount / totalPayments) * 100
        : 0;

      setPaidPaymentPercentage(paidPayment);
      setPendingPaymentPercentage(pendingPercentage);

      setTotalPaymentPending(pendingCount); // ✅ send number not array

      setCancelled(cancelled.length);
      setCompleted(completed.length);

      console.log('Paid %:', paidPayment);
      console.log('Pending %:', pendingPercentage);



    } catch (error) {
      console.log('error', error)
    }
  }

  // fetching PupilsMoneyHistory
  async function PupilsMoneyHistory() {
    try {
      const res = await fetchPupilsMoney(id);
      console.log('res', res)
      setMoneyHistory(res)

    } catch (error) {
      console.log('error', error)
    }
  }
  // color set for bookings

  function colorSet(status) {
    if (status === "completed") {
      return "bg-green-500";
    }
    else if (status === "cancelled") {
      return "bg-red-500";
    }
    else if (status === "booked") {
      return "bg-blue-500";
    }
    else if (status === "pending") {
      return "bg-yellow-500";
    }
    else {
      return "bg-blue-500";
    }
  }
  useEffect(() => {
    PupilsMoneyHistory()
    Bookings()
    console.log('leaner', learner)
  }, [id])

  // 🔒 Safety check FIRST
  // if (!learner) {
  //   return <Navigate to="/learners" replace />;
  // }

  // 📊 Chart Data
  //   const lessonChartData = [
  //     { x: 'Completed', y: learner?.LessonsCompleted, text: `${learner?.LessonsCompleted}` },
  //     {
  //       x: 'Remaining',
  //       y: learner?.LessonsBooked - learner?.LessonsCompleted,
  //       text: `${learner?.LessonsBooked - learner?.LessonsCompleted}`,
  //     },
  //   ];

  const paymentChartData = [
    {
      x: 'Completed',
      y: PaidPaymentPercentage,
      text: PaidPaymentPercentage.toFixed(0) + '%',
    },
    {
      x: 'Pending',
      y: PendingPaymentPercentage,
      text: PendingPaymentPercentage.toFixed(0) + '%',
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
        {learner?.ProfileImage ? <img
          src={learner?.ProfileImage}
          alt={learner?.Name}
          className="w-20 h-20 rounded-full object-cover"
        /> : <div className='w-20 h-20 rounded-full flex justify-center items-center bg-[#03C9D7] text-3xl text-white '>{learner?.full_name.charAt(0)}</div>}
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
                style={{ width: `${(TotalCreditUsed / learner?.package_id?.duration) * 100}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 mt-2">
              {(TotalCreditUsed / learner?.package_id?.duration) * 100}% completed
            </p>
          </div>

          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4">Package </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <Info label="Name" value={learner?.package_id?.package_name} />

              <Info label="Duration" value={learner?.package_id?.duration} />
              <Info label="Area Name" value={learner?.area_id?.name} />
              <Info label="Area Code" value={learner?.area_id?.code} />
               <Info label="Package Price" value={learner?.package_price} />
              {/* <Info label="Test Date" value={learner?.TestDate} />
              <Info label="Zone" value={learner?.Zone} />
              <Info label="Postcode" value={learner?.Postcode} />
              <Info label="Country" value={learner?.Country} />
              <Info label="Auto Pay" value={learner?.AutoPay} />
              <Info label="Payment Method" value={learner?.PaymentMethod} />
              <Info label="Theory Test" value={learner?.TheoryTestPassed} /> */}
            </div>
          </div>
          <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-xl mb-6">Lessons</h3>

            <div className="max-h-[300px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {AllBookings?.map((book) => {
                  const formattedDate = new Date(book.booking_date).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short", year: "numeric" }
                  );

                  return (
                    <div
                      key={book._id}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      {/* Header */}
                      <div className="flex justify-between flex-wrap items-start mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {book.title}
                        </h4>

                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${colorSet(
                            book.status
                          )}`}
                        >
                          {book.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <p>
                          <span className="font-medium">Instructor:</span>{" "}
                          {book.instructor_id?.name}
                        </p>

                        <p>
                          <span className="font-medium">Duration:</span>{" "}
                          {book.credit_use} hrs
                        </p>

                        <p>
                          <span className="font-medium">Date:</span> {formattedDate}
                        </p>

                        <p>
                          <span className="font-medium">Time:</span>{" "}
                          {book.start_time} - {book.end_time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Booked" value={AllBookings?.length} />
            <Stat label="Completed" value={Completed} />
            <Stat label="Cancelled" value={Cancelled} />
            <Stat label="Total Hours" value={learner?.package_id?.duration} />
          </div>
          <div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* LESSON CHART */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl p-6 shadow-md">
            <h3 className="font-semibold text-center mb-6 text-lg">
              Payment Overview
            </h3>

            {MoneyHistory?.map((money) => (
              <div
                key={money._id}
                className="bg-gray-50 dark:bg-secondary-dark-bg border rounded-xl p-5 mb-4"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-green-600">
                      £{money.amount}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(money.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {money.payment_method?.toUpperCase()}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t my-4"></div>

                {/* Instructor Section */}
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-500 font-medium">
                    Instructor
                  </p>

                  <p className="font-semibold text-gray-800">
                    {money.instructor_id?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>




          {/* PAYMENT */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow text-sm">
            <h3 className="font-semibold mb-3">Credits Summary</h3>
            <p>Total Hours: <strong>{learner?.package_id?.duration}</strong></p>
            <p>Total Spent: {TotalCreditUsed}</p>
            <p>Remaining: {learner?.package_id?.duration - TotalCreditUsed}</p>
          </div>

          {/* PAYMENT CHART */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
            <h3 className="font-semibold text-center mb-2">Lessions Status Overview</h3>
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
