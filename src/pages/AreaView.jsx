import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import axios from '../services/axios';

const AreaView = () => {
  const { id } = useParams();

  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch single branch */
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await axios.get(`/branchs/${id}`);
        setBranch(res.branch);
      } catch (error) {
        setError('Failed to fetch branch');
      } finally {
        setLoading(false);
      }
    };

    fetchBranch();
  }, [id]);

  if (!loading && !branch) {
    return <Navigate to="/areas" replace />;
  }

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    branch.address
  )}&output=embed`;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* BACK */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow">
        <div className="flex flex-col md:flex-row justify-between gap-6">

          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-bold">{branch.name}</h1>
            <p className="text-gray-500 text-sm">Branch Code: {branch.code}</p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MdEmail /> {branch.contact_email}
              </p>
              <p className="flex items-center gap-2">
                <MdPhone /> {branch.phone}
              </p>
              <p className="flex items-center gap-2">
                <MdLocationOn /> {branch.address}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                branch.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {branch.status}
            </span>

            <div className="text-sm text-gray-500">
              <p>Created: {new Date(branch.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(branch.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>

        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAP */}
        <div className="lg:col-span-2 bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
          <h3 className="font-semibold mb-3">Branch Location</h3>
          <iframe
            title="Branch Location"
            src={mapSrc}
            className="w-full h-80 rounded-lg border"
            loading="lazy"
          />
        </div>

        {/* INFO */}
        <div className="space-y-4">
          <Info label="Currency" value={`${branch.branch_currency} (${branch.currency_symbol})`} />
          <Info label="Timezone" value={branch.branch_timezones} />
          <Info label="Contact Email" value={branch.contact_email} />
          <Info label="Phone" value={branch.phone} />
        </div>

      </div>
    </div>
  );
};

/* ===== SMALL INFO CARD ===== */
const Info = ({ label, value }) => (
  <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-4 shadow">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default AreaView;
