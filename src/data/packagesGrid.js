import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

export const packagesGrid = [
  { type: 'checkbox', width: '50' },

  {
    field: 'PackageID',
    headerText: 'Package ID',
    width: '150',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

  {
    headerText: 'View',
    width: '80',
    textAlign: 'Center',
    template: (rowData) => (
      <Link to={`/packages/${rowData.PackageID}`}>
        <AiOutlineEye className="text-xl text-red-600 hover:text-blue-800 cursor-pointer" />
      </Link>
    ),
  },

  {
    field: 'Title',
    headerText: 'Title',
    width: '200',
    textAlign: 'Center',
  },

  {
    field: 'AreaName',
    headerText: 'Area',
    width: '140',
    textAlign: 'Center',
  },

  {
    field: 'Duration',
    headerText: 'Duration',
    width: '110',
    textAlign: 'Center',
  },

  {
    field: 'Type',
    headerText: 'Type',
    width: '130',
    textAlign: 'Center',
  },

  {
    field: 'DisplayPrice',
    headerText: 'Price',
    width: '120',
    textAlign: 'Center',
  },

  {
    headerText: 'Status',
    width: '120',
    textAlign: 'Center',
    template: (rowData) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          rowData.Active
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {rowData.Active ? 'Active' : 'Inactive'}
      </span>
    ),
  },
];