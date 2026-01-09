import React from 'react';

const InstructorStatus = ({ Active }) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        Active
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {Active ? 'Active' : 'Inactive'}
    </span>
  );

export default InstructorStatus;
