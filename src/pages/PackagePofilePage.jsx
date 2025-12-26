import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { packagesList } from '../data/dummy';

const PackageProfilePage = () => {
  const { id } = useParams();

  // ✅ Find package from FLATTENED list
  const pkg = packagesList.find((p) => p.PackageID === id);

  // 🔒 Safety check
  if (!pkg) {
    return <Navigate to="/packages" replace />;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      <button
        type="button"
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back to Packages
      </button>

      {/* HEADER */}
      <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">{pkg.Title}</h1>
          <p className="text-sm text-gray-500">
            Package ID: {pkg.PackageID}
          </p>
          <p className="text-sm text-gray-500">
            Area: {pkg.AreaName}
          </p>
        </div>

        <StatusBadge active={pkg.Active} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* PACKAGE DETAILS */}
          <Card title="Package Details">
            <Info label="Type" value={pkg.Type} />
            <Info label="Duration" value={pkg.Duration} />
            <Info label="Price" value={pkg.DisplayPrice} />
            <Info label="Currency" value={pkg.Currency} />
          </Card>

          {/* ELIGIBILITY */}
          {pkg.Eligibility && (
            <Card title="Eligibility">
              <ul className="list-disc list-inside text-sm text-gray-700">
                {pkg.Eligibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          )}

          {/* COVERAGE */}
          <Card title="Coverage Areas">
            <div className="flex flex-wrap gap-2">
              {pkg.Coverage.map((place) => (
                <span
                  key={place}
                  className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700"
                >
                  {place}
                </span>
              ))}
            </div>
          </Card>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* AREA INFO */}
          <Card title="Area Information">
            <Info label="Area Name" value={pkg.AreaName} />
            <Info label="Area ID" value={pkg.AreaID} />
            <Info label="Slug" value={pkg.AreaSlug} />
          </Card>

          {/* META */}
          <Card title="Package Meta">
            <Info label="Package ID" value={pkg.PackageID} />
            <Info label="Status" value={pkg.Active ? 'Active' : 'Inactive'} />
          </Card>

        </div>
      </div>
    </div>
  );
};

export default PackageProfilePage;
/* ---------- SMALL COMPONENTS ---------- */

const Card = ({ title, children }) => (
  <div className="bg-white dark:bg-secondary-dark-bg rounded-xl p-6 shadow space-y-4">
    <h3 className="font-semibold">{title}</h3>
    {children}
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const StatusBadge = ({ active }) => (
  <span
    className={`px-4 py-1 rounded-full text-sm font-medium self-start ${
      active
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700'
    }`}
  >
    {active ? 'Active' : 'Inactive'}
  </span>
);

