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
    const newArgs = { ...args };

    if (newArgs.requestType === 'save') {
      newArgs.data = {
        ...newArgs.data,
        branches: branches || [],
        packages: packages || [],
      };
      try {
        if (newArgs.action === 'add') {
          await addPricing(newArgs.data);
        }
        if (newArgs.action === 'edit') {
          await updatePricing(newArgs.data._id, newArgs.data);
        }
      } catch {
        toast.error('Save failed');
      }
    }

    if (newArgs.requestType === 'delete') {
      const row = newArgs.data?.[0];
      if (!row?._id) return;
      try {
        await deletePricing(row._id);
      } catch {
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
