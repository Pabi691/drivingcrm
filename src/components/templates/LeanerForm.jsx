import React, { useState, useEffect } from 'react';

const LearnerForm = ({
  learnerValues = {},
  branches = [],
  instructors = [],
  packages = [],
}) => {
  const [formValues, setFormValues] = useState({
    full_name: '',
    phone: '',
    email: '',
    instructor_id: '',
    area_id: '',
    package_id: '',
    remaining_hour: '',
    progress: 0,
    payment_status: 'pending',
    active: 0,
  });

  // ✅ ONLY populate when editing (has _id)
  useEffect(() => {
    if (!learnerValues?._id) return;

    setFormValues({
      full_name: learnerValues.full_name || '',
      phone: learnerValues.phone || '',
      email: learnerValues.email || '',
      instructor_id: learnerValues.instructor_id?._id || '',
      area_id: learnerValues.area_id?._id || '',
      package_id: learnerValues.package_id?._id || '',
      remaining_hour: learnerValues.remaining_hour || '',
      progress: learnerValues.progress || 0,
      payment_status: learnerValues.payment_status || 'pending',
      active: learnerValues.active || 0,
    });
  }, [learnerValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      <input
        type="text"
        name="full_name"
        value={formValues.full_name}
        onChange={handleChange}
        className="e-input w-full"
        placeholder="Full Name"
      />

      <input
        type="text"
        name="phone"
        value={formValues.phone}
        onChange={handleChange}
        className="e-input w-full"
        placeholder="Phone"
      />

      <input
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        className="e-input w-full"
        placeholder="Email"
      />

      {/* Area */}
      <select
        name="area_id"
        value={formValues.area_id}
        onChange={handleChange}
        className="e-input w-full"
      >
        <option value="">Select Area</option>
        {branches.map((b) => (
          <option key={b._id} value={b._id}>
            {b.name}
          </option>
        ))}
      </select>

      {/* Instructor */}
      <select
        name="instructor_id"
        value={formValues.instructor_id}
        onChange={handleChange}
        className="e-input w-full"
      >
        <option value="">Select Instructor</option>
        {instructors.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      {/* Package */}
      <select
        name="package_id"
        value={formValues.package_id}
        onChange={handleChange}
        className="e-input w-full"
      >
        <option value="">Select Package</option>
        {packages.map((p) => (
          <option key={p._id} value={p._id}>
            {p.package_name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="remaining_hour"
        value={formValues.remaining_hour}
        onChange={handleChange}
        className="e-input w-full"
        placeholder="Remaining Hours"
      />

      <select
        name="active"
        value={formValues.active}
        onChange={handleChange}
        className="e-input w-full"
      >
        <option value={1}>active</option>
        <option value={0}>inactive</option>
      </select>

      <select
        name="payment_status"
        value={formValues.payment_status}
        onChange={handleChange}
        className="e-input w-full"
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>

    </div>
  );
};

export default LearnerForm;
