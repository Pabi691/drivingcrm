import React from 'react';
import { GrLocation } from 'react-icons/gr';

const InstructorCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
      <GrLocation className="text-gray-500" />
      <span className="text-sm">{props.Country}</span>
    </div>
  );

export default InstructorCountry;
