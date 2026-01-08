import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

export const pricingGrid = [
  { type: 'checkbox', width: '50' },

  {
    field: '_id',
    headerText: 'Pricing ID',
    width: '180',
    textAlign: 'Center',
    isPrimaryKey: true,
    visible: false, // hidden in grid, available for edit
  },

  {
    field: 'package_name',
    headerText: 'Package Name',
    width: '220',
    template: (rowData) => (
      <span className="font-medium">
        {rowData.package_id?.package_name}
      </span>
    ),
  },
  {
    field: 'duration',
    headerText: 'Package Duration',
    width: '220',
    template: (rowData) => (
      <span className="font-medium">
        {rowData.package_id?.duration} Hours
      </span>
    ),
  },
  {
    field: 'price',
    headerText: 'Price',
    width: '220',
    // textAlign: 'Center',
    template: (rowData) => (
        <span>
            {rowData.currency_symbol || '$'}{rowData.price}
        </span>
        )
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
