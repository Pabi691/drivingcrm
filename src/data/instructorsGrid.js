import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const instructorsGrid = [
  { type: 'checkbox', width: '50' },

  {
    field: '_id',
    headerText: 'Instructor ID',
    width: '125',
    isPrimaryKey: true,
  },

  // {
  //   headerText: 'Instructor',
  //   width: '150',
  //   template: gridInstructorProfile,
  //   textAlign: 'Center',
  // },

  { field: 'name', headerText: 'Full Name', width: '150' },

  { field: 'email', headerText: 'Email', width: '200' },

  { field: 'mobile', headerText: 'Phone', width: '150' },

  // { field: 'Designation', headerText: 'ADI / PDI', width: '120', textAlign: 'Center' },

  // { field: 'Zone', headerText: 'Zone (1–4)', width: '120', textAlign: 'Center' },

  // { field: 'Postcode', headerText: 'Postcode', width: '120', textAlign: 'Center' },

  // {
  //   headerText: 'Country',
  //   width: '120',
  //   textAlign: 'Center',
  //   template: gridInstructorCountry,
  // },

  // { field: 'JoinDate', headerText: 'Join Date', width: '135', format: 'yMd', textAlign: 'Center' },

  // { field: 'Availability', headerText: 'Working Hours', width: '150', textAlign: 'Center' },

  // { field: 'DaysOff', headerText: 'Days Off', width: '120', textAlign: 'Center' },

  // { field: 'OnLeave', headerText: 'Holiday/Sick Leave', width: '150', textAlign: 'Center' },

  // { field: 'PupilCount', headerText: 'Learners', width: '100', textAlign: 'Center' },

  // { field: 'PassRate', headerText: 'Pass Rate (%)', width: '120', textAlign: 'Center' },

  // { field: 'LessonsCompleted', headerText: 'Lessons (This Month)', width: '170', textAlign: 'Center' },

  // { field: 'ConversionRate', headerText: 'Enquiry Conversion (%)', width: '170', textAlign: 'Center' },

  // { field: 'IncomeMonth', headerText: 'Income (This Month)', width: '150', textAlign: 'Center' },

  // { field: 'ExpensesMonth', headerText: 'Expenses (This Month)', width: '150', textAlign: 'Center' },

  // { field: 'FranchiseFee', headerText: 'Franchise Fee', width: '150', textAlign: 'Center' },

  // { field: 'ADIExpiry', headerText: 'ADI Badge Expiry', width: '150', textAlign: 'Center' },

  // { field: 'PDIExpiry', headerText: 'PDI License Expiry', width: '150', textAlign: 'Center' },

  // { field: 'InsuranceExpiry', headerText: 'Insurance Expiry', width: '150', textAlign: 'Center' },

  // { field: 'MOTExpiry', headerText: 'MOT Expiry', width: '150', textAlign: 'Center' },
  {
    headerText: 'Status',
    width: '120',
    template: (rowData) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          rowData.status === 1
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {rowData.status === 1 ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    headerText: 'View',
    width: '80',
    template: (rowData) => (
      <Link to={`/instructors/${rowData._id}`}>
        <AiOutlineEye className="text-xl text-red-600 hover:text-blue-800 cursor-pointer" />
      </Link>
    ),
  },
  
];