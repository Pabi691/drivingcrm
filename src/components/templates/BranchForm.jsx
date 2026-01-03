import React from 'react';

const BranchForm = ({
  _id,
  name,
  code,
  address,
  contactEmail,
  phone,
  status,
  branchCurrency,
  currencySymbol,
  branchTimezones,
}) => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

    {_id && <input type="hidden" name="_id" value={_id} />}

    <div>
      {/* <label htmlFor="name">Branch Name</label> */}
      <input
        id="name"
        name="name"
        className="e-input w-full"
        defaultValue={name || ''}
        placeholder='Branch Name'
        required
      />
    </div>

    <div>
      {/* <label htmlFor="code">Branch Code</label> */}
      <input
        id="code"
        name="code"
        className="e-input w-full"
        placeholder='Branch Code'
        defaultValue={code || ''}
        required
      />
    </div>

    <div className="md:col-span-2">
      {/* <label htmlFor="address">Address</label> */}
      <input
        id="address"
        name="address"
        className="e-input w-full"
        placeholder='Address'
        defaultValue={address || ''}
        required
      />
    </div>

    <div>
      {/* <label htmlFor="contactEmail">Email</label> */}
      <input
        id="contactEmail"
        name="contact_email"
        className="e-input w-full"
        placeholder='Email'
        defaultValue={contactEmail || ''}
      />
    </div>

    <div>
      {/* <label htmlFor="phone">Phone</label> */}
      <input
        id="phone"
        name="phone"
        className="e-input w-full"
        placeholder='Phone'
        defaultValue={phone || ''}
      />
    </div>

    <div>
      {/* <label htmlFor="status">Status</label> */}
      <select
        id="status"
        name="status"
        className="e-input w-full"
        defaultValue={status || 'Active'}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <div>
      {/* <label htmlFor="branchCurrency">Currency</label> */}
      <input
        id="branchCurrency"
        name="branch_currency"
        className="e-input w-full"
        defaultValue={branchCurrency || 'USD'}
      />
    </div>

    <div>
      {/* <label htmlFor="currencySymbol">Currency Symbol</label> */}
      <input
        id="currencySymbol"
        name="currency_symbol"
        className="e-input w-full"
        defaultValue={currencySymbol || '$'}
      />
    </div>

    <div className="md:col-span-2">
      {/* <label htmlFor="branchTimezones">Timezone</label> */}
      <input
        id="branchTimezones"
        name="branch_timezones"
        className="e-input w-full"
        placeholder='Timezone'
        defaultValue={branchTimezones || ''}
      />
    </div>

  </div>
);

export default BranchForm;
