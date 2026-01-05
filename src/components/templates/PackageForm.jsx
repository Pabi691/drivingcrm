import React from 'react';

const PackageForm = ({packageValues}) => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

    {packageValues._id && <input type="hidden" name="_id" value={packageValues._id} />}
    <input
      name="package_name"
      className="e-input"
      placeholder="Package Name"
      defaultValue={packageValues.package_name || ''}
      required
    />

    <input
      name="package_slug"
      className="e-input"
      placeholder="Slug"
      defaultValue={packageValues.package_slug || ''}
      required
    />

    <input
      type="number"
      name="duration"
      className="e-input"
      placeholder="Hours Duration"
      defaultValue={packageValues.duration || ''}
      required
    />

  </div>
);

export default PackageForm;
