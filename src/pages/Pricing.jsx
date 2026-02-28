import React, { useEffect } from 'react';
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Selection,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids';
import toast from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';
import { pricingGrid } from '../data/pricingGrid';
import { Header } from '../components';
import EditPricingTemplate from '../components/templates/EditPricingTemplate';

const GridEditTemplate = (props) => {
  const { branches, packages } = useStateContext();

  return (
    <EditPricingTemplate
      {...props}
      branches={branches || []}
      packages={packages || []}
    />
  );
};

const Pricing = () => {

  const {
    pricing,
    fetchPricing,
    fetchBranches,
    fetchPackages,
    addPricing,
    updatePricing,
    deletePricing,
  } = useStateContext();

  const toolbarOptions = ['Search', 'Delete', 'Add', 'Edit'];

  useEffect(() => {
    fetchPricing();
    fetchBranches();
    fetchPackages();
  }, []);

  const handleActionBegin = async (args) => {

    // SAVE
    if (args.requestType === 'save') {

      args.cancel = true;

      const form = args.form;

      const payload = {
        branch_id: form.querySelector('[name="branch_id"]').value,
        package_id: form.querySelector('[name="package_id"]').value,
        price: Number(form.querySelector('[name="price"]').value),
      };

      try {

        if (args.action === 'add') {
          await addPricing(payload);
          toast.success('Pricing Added');
        }

        if (args.action === 'edit') {
          await updatePricing(args.data._id, payload);
          toast.success('Pricing Updated');
        }

        await fetchPricing();
        args.dialog.close();

      } catch (err) {
        console.log(err);
        toast.error('Save failed');
      }
    }

    // DELETE
    if (args.requestType === 'delete') {

      args.cancel = true;

      const row = Array.isArray(args.data)
        ? args.data[0]
        : args.data;

      if (!row?._id) return;

      try {
        await deletePricing(row._id);
        await fetchPricing();
        toast.success('Pricing Deleted');
      } catch (err) {
        console.log(err);
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="m-2 md:m-6 mt-6 p-2 md:p-4 bg-white rounded-2xl">
      <Header title="Pricing" />

      <GridComponent
        dataSource={pricing}
        allowPaging
        allowSorting
        toolbar={toolbarOptions}
        actionBegin={handleActionBegin}
        editSettings={{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          mode: 'Dialog',
          template: GridEditTemplate,
          dialog: { width: '800px', minHeight: '400px' },
          showDeleteConfirmDialog: true,
        }}
      >
        <ColumnsDirective>
          {pricingGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              {...item}
            />
          ))}
        </ColumnsDirective>

        <Inject services={[Search, Page, Selection, Edit, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Pricing;
