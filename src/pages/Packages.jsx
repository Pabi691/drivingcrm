import React, { useEffect, memo } from 'react';
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
import { packagesGrid } from '../data/packagesGrid';
import { Header } from '../components';
import EditPackageTemplate from '../components/templates/EditPackageTemplate';

// Memo wrapper
// const EditTemplateWrapper = memo((props) => <EditPackageTemplate {...props} />);
const EditTemplateWrapper = memo(({ packageData }) => <EditPackageTemplate packageData={packageData} />);
const GridEditTemplate = (props) => <EditTemplateWrapper packageData={props} />;

const Packages = () => {
  const {
    packages,
    fetchPackages,
    addPackage,
    updatePackage,
    deletePackage,
  } = useStateContext();

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search', 'Delete', 'Add', 'Edit'];

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleActionBegin = async (args) => {
    const newArgs = { ...args };

    if (newArgs.requestType === 'save') {
      try {
        if (newArgs.action === 'add') {
          await addPackage(newArgs.data);
        }
        if (newArgs.action === 'edit') {
          await updatePackage(newArgs.data._id, newArgs.data);
        }
      } catch {
        toast.error('Save failed');
      }
    }

    if (args.requestType === 'delete') {
      const row = args.data?.[0];
      if (!row?._id) return;
      try {
        await deletePackage(row._id);
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="m-2 md:m-6 mt-6 p-2 md:p-4 bg-white rounded-2xl">
      <Header title="Packages" />
      <GridComponent
        dataSource={packages}
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
          {packagesGrid.map((item, index) => (
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

export default Packages;
