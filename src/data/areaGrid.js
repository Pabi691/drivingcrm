import React from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineEye } from 'react-icons/ai';

export const areaGrid = [
  { type: 'checkbox', width: '50' },

  {
    field: '_id',
    headerText: 'Area ID',
    width: '180',
    textAlign: 'start',
    isPrimaryKey: true,
    visible: false,
  },

  {
    field: 'name',
    headerText: 'Area Name',
    width: '180',
  },

  {
    field: 'code',
    headerText: 'Area Code',
    width: '140',
    allowEditing: true,
  },

  // {
  //   headerText: 'School',
  //   width: '220',
  //   template: (rowData) => (
  //     <span className="font-medium">
  //       {rowData.school_id?.school_name || '-'}
  //     </span>
  //   ),
  // },

  // {
  //   headerText: 'City',
  //   width: '140',
  //   template: (rowData) => (
  //     <span>{rowData.school_id?.city || '-'}</span>
  //   ),
  // },

  // {
  //   field: 'contact_email',
  //   headerText: 'Email',
  //   width: '220',
  // },

  // {
  //   field: 'phone',
  //   headerText: 'Phone',
  //   width: '150',
  // },

  // {
  //   headerText: 'Currency',
  //   width: '120',
  //   textAlign: 'Center',
  //   template: (rowData) => (
  //     <span>
  //       {rowData.currency_symbol} {rowData.branch_currency}
  //     </span>
  //   ),
  //   visible: false,
  // },

  // {
  //   headerText: 'Timezone',
  //   width: '180',
  //   textAlign: 'Center',
  //   field: 'branch_timezones',
  //   visible: false,
  // },

  {
    headerText: 'Status',
    width: '120',
    textAlign: 'Center',
    template: (rowData) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          rowData.status === 'Active'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {rowData.status}
      </span>
    ),
  },

  // {
  //   headerText: 'View',
  //   width: '80',
  //   template: (rowData) => (
  //     <Link to={`/areas/${rowData._id}`}>
  //       <AiOutlineEye className="text-xl text-red-600 hover:text-blue-800 cursor-pointer" />
  //     </Link>
  //   ),
  // },
];
