import React from 'react';

const BranchForm = ({branch}) => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

    {branch._id && <input type="hidden" name="_id" value={branch._id} />}

    <div>
      {/* <label htmlFor="name">Branch Name</label> */}
      <input
        id="name"
        name="name"
        className="e-input w-full"
        defaultValue={branch.name || ''}
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
        defaultValue={branch.code || ''}
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
        defaultValue={branch.address || ''}
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
        defaultValue={branch.contact_email || ''}
      />
    </div>

    <div>
      {/* <label htmlFor="phone">Phone</label */}
      <input
        id="phone"
        name="phone"
        className="e-input w-full"
        placeholder='Phone'
        defaultValue={branch.phone || ''}
      />
    </div>

    <div>
      {/* <label htmlFor="status">Status</label> */}
      <select
        id="status"
        name="status"
        className="e-input w-full"
        defaultValue={branch.status || 'Active'}
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
        defaultValue={branch.branch_currency || 'USD'}
      />
    </div>

    <div>
      {/* <label htmlFor="currencySymbol">Currency Symbol</label> */}
      <input
        id="currencySymbol"
        name="currency_symbol"
        className="e-input w-full"
        defaultValue={branch.currency_symbol || '$'}
      />
    </div>

    <div className="md:col-span-2">
      {/* <label htmlFor="branchTimezones">Timezone</label> */}
      <input
        id="branchTimezones"
        name="branch_timezones"
        className="e-input w-full"
        placeholder='Timezone'
        defaultValue={branch.branch_timezones || ''}
      />
    </div>

  </div>
);

export default BranchForm;
