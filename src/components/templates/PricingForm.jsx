import React, { useState } from 'react';

const PricingForm = ({ pricingValues = {}, branches = [], packages = [] }) => {
  const [formValues, setFormValues] = useState({
    branch_id: pricingValues.branch_id?._id || '',
    package_id: pricingValues.package_id?._id || '',
    price: pricingValues.price || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Branch */}
      <div>
        <select
          name="branch_id"
          value={formValues.branch_id}
          onChange={handleChange}
          className="e-input w-full"
          required
        >
          <option value="">Select Area</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* Package */}
      <div>
        <select
          name="package_id"
          value={formValues.package_id}
          onChange={handleChange}
          className="e-input w-full"
          required
        >
          <option value="">Select Package</option>
          {packages.map((p) => (
            <option key={p._id} value={p._id}>{p.package_name}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <input
          type="number"
          name="price"
          value={formValues.price}
          onChange={handleChange}
          className="e-input w-full"
          required
        />
      </div>
    </div>
  );
};

export default PricingForm;
