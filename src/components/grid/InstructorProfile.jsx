import React from 'react';

const InstructorProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.ProfileImage}
        alt={props.Name || 'Instructor'}
      />
      <p className="text-sm font-medium">{props.Name}</p>
    </div>
  );

export default InstructorProfile;
