
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const LearnerProfilePage = () => {
  const {
    learners,
    fetchPupilsMoney,
    getPupilBookings,
    getPupilCreditsLog,
    getPupilSell,
  } = useStateContext();

  const [MoneyHistory, setMoneyHistory] = useState([]);
  const [SellHistory, setSellHistory] = useState([]);
  const [CreditLogs, setCreditLogs] = useState([]);
  const [AllBookings, setBookings] = useState([]);

  const [Cancelled, setCancelled] = useState(0);
  const [Completed, setCompleted] = useState(0);

  const { id } = useParams();

  const learner = learners.find((l) => l._id === id);

  /* ================= COMPLETION CALC ================= */

  const totalCredits = learner?.total_credit || 0;
  const remainingHours = learner?.remaining_hour || 0;
  let usedHours = totalCredits - remainingHours;

  if (remainingHours == 0) {
    usedHours = 0;
  }

  const completedPercentage =
    totalCredits > 0 ? (usedHours / totalCredits) * 100 : 0;

  /* ================= BOOKINGS ================= */

  async function Bookings() {
    try {
      const res = await getPupilBookings(id);

      setBookings(res.data);

      const cancelled = res.data.filter((b) => b.status === "cancelled");
      const completed = res.data.filter((b) => b.status === "completed");

      setCancelled(cancelled.length);
      setCompleted(completed.length);
    } catch (error) {
      console.log(error);
    }
  }

  /* ================= MONEY HISTORY ================= */

  async function PupilsMoneyHistory() {
    try {
      const res = await fetchPupilsMoney(id);
      setMoneyHistory(res);
    } catch (error) {
      console.log(error);
    }
  }

  /* ================= PACKAGES ================= */

  async function GetAllSell() {
    try {
      const res = await getPupilSell(id);
      setSellHistory(res);
    } catch (error) {
      console.log(error);
    }
  }

  /* ================= CREDIT LOGS ================= */

  async function GetAllLogs() {
    try {
      const res = await getPupilCreditsLog(id);
      setCreditLogs(res);
    } catch (error) {
      console.log(error);
    }
  }

  /* ================= STATUS COLORS ================= */

  function colorSet(status) {
    if (status === "completed") return "bg-green-500";
    if (status === "cancelled") return "bg-red-500";
    if (status === "booking_request") return "bg-blue-500";
    if (status === "pending") return "bg-yellow-500";
    return "bg-gray-400";
  }

  useEffect(() => {
    PupilsMoneyHistory();
    Bookings();
    GetAllSell();
    GetAllLogs();
  }, [id]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* BACK BUTTON */}

      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-500 hover:text-blue-500"
      >
        ← Back
      </button>

      {/* HEADER */}

      <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow flex items-center gap-5">
        {learner?.ProfileImage ? (
          <img
            src={learner.ProfileImage}
            alt={learner.full_name}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#03C9D7] text-white text-3xl">
            {learner?.full_name?.charAt(0)}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{learner?.full_name}</h1>
          <p className="text-gray-500 text-sm">Pupil ID #{learner?._id}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}

        <div className="lg:col-span-2 space-y-6">
          {/* PUPIL INFO */}

          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4">Pupil Information</h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Info label="Name" value={learner?.full_name} />
              <Info label="Phone" value={learner?.phone} />
              <Info label="Instructor" value={learner?.instructor_id?.name} />
              <Info label="Email" value={learner?.email} />
            </div>
          </div>

          {/* COURSE COMPLETION */}

          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4 text-lg">Course Completion</h3>

            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-4"
                style={{ width: `${completedPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-5 text-center">
              <Stat label="Completed" value={`${completedPercentage.toFixed(1)}%`} />
              <Stat label="Used Hours" value={usedHours.toFixed(2)} />
              <Stat label="Remaining" value={remainingHours.toFixed(2)} />
              <Stat label="Total Credits" value={totalCredits.toFixed(2)} />
            </div>
          </div>

          {/* LESSONS */}

          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold text-xl mb-6">Lessons</h3>

            <div className="max-h-[320px] overflow-y-auto grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {AllBookings?.length === 0 && (
                <p className="text-gray-400 text-center col-span-full">
                  No lessons found
                </p>
              )}

              {AllBookings?.map((book) => {
                const formattedDate = new Date(
                  book.booking_date
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={book._id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border"
                  >
                    <h4 className="font-semibold text-sm">
                      {book.title}
                    </h4>

                    <span
                      className={`inline-block mt-2 text-xs text-white px-3 py-1 rounded ${colorSet(
                        book.status
                      )}`}
                    >
                      {book.status.replace("_", " ")}
                    </span>

                    <div className="mt-4 text-sm space-y-1">
                      <p>
                        <b>Instructor:</b> {book.instructor_id?.name}
                      </p>

                      <p>
                        <b>Duration:</b> {Number(book.credit_use).toFixed(2)} hrs
                      </p>

                      <p>
                        <b>Date:</b> {formattedDate}
                      </p>

                      <p>
                        <b>Time:</b> {book.start_time} - {book.end_time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Booked" value={AllBookings?.length || 0} />
            <Stat label="Completed" value={Completed || 0} />
            <Stat label="Cancelled" value={Cancelled || 0} />
            <Stat label="Total Credits" value={totalCredits || 0} />
          </div>
        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-6">
          {/* PAYMENT HISTORY */}

          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-5 text-center">
              Payment Overview
            </h3>

            {MoneyHistory?.length === 0 && (
              <p className="text-gray-400 text-center">
                No payment history available
              </p>
            )}

            {MoneyHistory?.map((money) => (
              <div key={money._id} className="border rounded-xl p-4 mb-3">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold text-green-600">
                    £{money.amount}
                  </h2>

                  <span className="text-xs bg-green-100 px-2 py-1 rounded">
                    {money.payment_method}
                  </span>
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(money.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* PACKAGES */}

          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-4 text-center">
              Purchased Packages
            </h3>

            <div className="h-[300px] overflow-y-auto space-y-3">
              {SellHistory?.length === 0 && (
                <p className="text-gray-400 text-center">
                  No packages purchased
                </p>
              )}

              {SellHistory?.map((sell) => (
                <div key={sell._id} className="border rounded-xl p-4">
                  <p className="font-semibold">
                    {sell.package_id?.package_name}
                  </p>

                  <p className="text-sm">
                    Credited Hours: {sell.credited_hour} hrs
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(sell.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CREDIT LOGS */}

          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-4 text-center">
              Credit Activity
            </h3>

            <div className="h-[300px] overflow-y-auto space-y-3">
              {CreditLogs?.length === 0 && (
                <p className="text-gray-400 text-center">
                  No credit activity found
                </p>
              )}

              {CreditLogs?.map((log) => {
                const isUsed = log.credit_hours.toString().startsWith("-");

                return (
                  <div
                    key={log._id}
                    className="border rounded-xl p-4 flex justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {isUsed ? "Credits Used" : "Credits Added"}
                      </p>

                      <p className="text-xs text-gray-400">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <p
                      className={`font-bold ${isUsed ? "text-red-600" : "text-green-600"
                        }`}
                    >
                      {log.credit_hours} hrs
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* HELPERS */

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

