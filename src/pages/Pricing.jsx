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
import {pricingGrid} from '../data/pricingGrid';
import { Header } from '../components';
import EditPricingTemplate from '../components/templates/EditPricingTemplate';

// Memo wrapper
// const EditTemplateWrapper = memo((props) => <EditPackageTemplate {...props} />);
// const EditTemplateWrapper = memo(({ pricingData }) => <EditPricingTemplate pricingData={pricingData} />);
const GridEditTemplate = (props) => {
  const { branches, packages } = useStateContext(); // get current data
  return (
    <EditPricingTemplate 
      pricingData={props} 
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
    branches,
    packages,
  } = useStateContext();

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search', 'Delete', 'Add', 'Edit'];

  useEffect(() => {
    fetchPricing();
    fetchBranches();
    fetchPackages();
  }, [fetchPricing, fetchBranches, fetchPackages]);
const handleActionBegin = async (args) => {

  // ================= SAVE =================
  if (args.requestType === 'save') {

    args.cancel = true;

    const payload = {
      branch_id: args.data.branch_id,
      package_id: args.data.package_id,
      price: Number(args.data.price),
      duration: args.data.duration || null
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

    } catch (err) {
      console.log(err);
      toast.error('Save failed');
    }
  }

  // ================= DELETE =================
  if (args.requestType === 'delete') {

    args.cancel = true;

    const row = args.data?.[0];   // ⭐ VERY IMPORTANT

    if (!row?._id) return;

    try {
      await deletePricing(row._id);
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
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        actionBegin={handleActionBegin}
        editSettings={{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          mode: 'Dialog',
          template: GridEditTemplate,
          dialog: { width: '1000px', minHeight: '450px' },
          showDeleteConfirmDialog: true,
        }}
      >
        <ColumnsDirective>
          {pricingGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              field={item.field}
              headerText={item.headerText}
              width={item.width}
              textAlign={item.textAlign}
              isPrimaryKey={item.isPrimaryKey || false}
              visible={item.visible !== undefined ? item.visible : true}
              allowEditing={item.allowEditing !== undefined ? item.allowEditing : true}
              type={item.type}
              // Only attach template if the column has a field or is for display
              template={item.template && !item.allowEditing ? item.template : undefined}
            />
          ))}
        </ColumnsDirective>

        <Inject services={[Search, Page, Selection, Edit, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Pricing;
