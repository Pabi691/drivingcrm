import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

export const pricingGrid = [
  { type: 'checkbox', width: '50' },

  {
    field: '_id',
    headerText: 'Pricing ID',
    width: '180',
    isPrimaryKey: true,
    visible: false,
  },

  {
    field: 'branch_id.name',
    headerText: 'Area',
    width: '180',
  },

  {
    field: 'package_id.package_name',
    headerText: 'Package Name',
    width: '220',
  },

  {
    field: 'package_id.duration',
    headerText: 'Package Duration',
    width: '200',
    template: (rowData) => (
      <span className="font-medium">
        {rowData.package_id?.duration} Hours
      </span>
    ),
  },

  {
    field: 'price',
    headerText: 'Price',
    width: '150',
    template: (rowData) => (
      <span>
        {rowData.currency_symbol || '$'}{rowData.price}
      </span>
    ),
  },

  {
    headerText: 'View',
    width: '80',
    allowEditing: false,
    visible: false,
    template: (rowData) => (
      <Link to={`/packages/${rowData._id}`}>
        <AiOutlineEye className="text-xl text-red-600 hover:text-red-800 cursor-pointer" />
      </Link>
    ),
  },
];
