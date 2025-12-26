import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { enquiriesData } from '../data/dummy';

const EnquiryProfilePage = () => {
  const { id } = useParams();

  const enquiry = enquiriesData.find(
    (e) => e.EnquiryID === Number(id)
  );

  // 🔒 Safety check
  if (!enquiry) {
    return <Navigate to="/enquiries" replace />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* BACK */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back to Enquiries
      </button>

      {/* HEADER */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {enquiry.FullName}
          </h1>
          <p className="text-sm text-gray-500">
            Enquiry #{enquiry.EnquiryID} · {enquiry.CreatedAt}
          </p>
          <p className="text-sm text-gray-600">
            {enquiry.Phone} · {enquiry.Email}
          </p>
        </div>

        <StatusBadge status={enquiry.EnquiryStatus} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* BASIC INFO */}
          <Card title="Enquiry Details">
            <Info label="Area" value={enquiry.Area} />
            <Info label="Postcode" value={enquiry.Postcode} />
            <Info label="Lesson Type" value={enquiry.LessonType} />
            <Info label="Preferred Transmission" value={enquiry.Transmission} />
            <Info label="Preferred Time" value={enquiry.PreferredTime} />
            <Info label="Start Timeline" value={enquiry.StartTimeline} />
          </Card>

          {/* PACKAGE */}
          <Card title="Interested Package">
            <Info label="Package" value={enquiry.InterestedPackage} />
            <Info label="Estimated Price" value={enquiry.EstimatedPrice} />
            <Info label="Zone" value={enquiry.Zone} />
          </Card>

          {/* NOTES */}
          <Card title="Notes">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {enquiry.Notes || 'No notes added yet.'}
            </p>
          </Card>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* STATUS */}
          <Card title="Lead Status">
            <Info label="Status" value={enquiry.EnquiryStatus} />
            <Info label="Priority" value={enquiry.Priority} />
            <Info label="Source" value={enquiry.Source} />
            <Info label="Assigned To" value={enquiry.AssignedTo} />
          </Card>

          {/* FOLLOW UP */}
          <Card title="Follow-up">
            <Info label="Follow-up Date" value={enquiry.FollowUpDate} />
            <Info label="Last Contacted" value={enquiry.LastContactedAt} />
          </Card>

          {/* ACTIONS */}
          <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow space-y-3">
            <h3 className="font-semibold">Quick Actions</h3>

            <button type='button' className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Convert to Learner
            </button>

            <button type='button' className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Schedule Trial Lesson
            </button>

            <button type='button' className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition">
              Add Follow-up Note
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EnquiryProfilePage;

/* ================= SMALL COMPONENTS ================= */

const Card = ({ title, children }) => (
  <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow space-y-4">
    <h3 className="font-semibold">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    New: 'bg-blue-100 text-blue-700',
    Contacted: 'bg-indigo-100 text-indigo-700',
    'Follow-up': 'bg-yellow-100 text-yellow-700',
    Converted: 'bg-green-100 text-green-700',
    Lost: 'bg-red-100 text-red-700',
    'Not Interested': 'bg-gray-100 text-gray-600',
  };

  return (
    <span
      className={`px-4 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};
