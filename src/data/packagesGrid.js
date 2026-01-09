import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

export const packagesGrid = [
  { type: 'checkbox', width: '50' },

  {
    field: '_id',
    headerText: 'Package ID',
    width: '180',
    textAlign: 'Center',
    isPrimaryKey: true,
    visible: false, // hidden in grid, available for edit
  },

  {
    field: 'package_name',
    headerText: 'Package Name',
    width: '220',
    // textAlign: 'Center',
  },

  {
    field: 'package_slug',
    headerText: 'Slug',
    width: '220',
    textAlign: 'Center',
    visible: false, // hidden but editable in dialog
  },

  {
    field: 'duration',
    headerText: 'Hours Duration',
    width: '120',
    // textAlign: 'Center',
  },

  {
    headerText: 'School Name/ID',
    width: '220',
    textAlign: 'Center',
    allowEditing: false,
    template: (rowData) => (
      <span className="font-medium">
        {rowData.school_id?.school_name || rowData.school_id}
      </span>
    ),
    visible: false,
  },

  {
    headerText: 'Created',
    width: '150',
    textAlign: 'Center',
    allowEditing: false,
    template: (rowData) =>
      new Date(rowData.createdAt).toLocaleDateString(),
    visible: false,
  },

  {
    headerText: 'Updated',
    width: '150',
    textAlign: 'Center',
    allowEditing: false,
    template: (rowData) =>
      new Date(rowData.updatedAt).toLocaleDateString(),
    visible: false,
  },

  {
    headerText: 'View',
    width: '80',
    // textAlign: 'Center',
    allowEditing: false,
    template: (rowData) => (
      <Link to={`/packages/${rowData._id}`}>
        <AiOutlineEye className="text-xl text-red-600 hover:text-red-800 cursor-pointer" />
      </Link>
    ),
    visible: false,
  },
];
