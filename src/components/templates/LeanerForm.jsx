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

    
  });

  console.log('learnern value',learnerValues)
  // ✅ Populate ONLY when:
  // - editing
  // - dropdown data is loaded

  useEffect(() => {
    if (!learnerValues?._id) return;
    if (!branches.length || !instructors.length) return;

    setFormValues({
      full_name: learnerValues.full_name || '',
      phone: learnerValues.phone || '',
      email: learnerValues.email || '',
      instructor_id: learnerValues.instructor_id?._id || '',
      area_id: learnerValues.area_id?._id || '',
      package_id: learnerValues.package_id?._id || '',
      
    });
  }, [learnerValues, branches, instructors, packages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
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
            {i.name || i.email}
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


     

     
    </div>
  );
};

export default LearnerForm;
