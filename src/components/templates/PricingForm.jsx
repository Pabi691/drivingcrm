import React, { useState, useEffect } from 'react';

const PricingForm = ({ pricingValues = {}, branches = [], packages = [] }) => {

  const [formData, setFormData] = useState({
    branch_id: '',
    package_id: '',
    price: ''
  });

  useEffect(() => {
    setFormData({
      branch_id: pricingValues.branch_id?._id || pricingValues.branch_id || '',
      package_id: pricingValues.package_id?._id || pricingValues.package_id || '',
      price: pricingValues.price || ''
    });
  }, [pricingValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Branch */}
      <div>
        <select
          name="branch_id"
          value={formData.branch_id}
          onChange={handleChange}
          className="e-input w-full"
          required
        >
          <option value="">Select Area</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Package */}
      <div>
        <select
          name="package_id"
          value={formData.package_id}
          onChange={handleChange}
          className="e-input w-full"
          required
          
        >
          <option value="">Select Package</option>
          {packages.map((p) => (
            <option key={p._id} value={p._id}>
              {p.package_name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="e-input w-full"
          required
        />
      </div>

    </div>
  );
};

export default PricingForm;
