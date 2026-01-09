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
import { areaGrid } from '../data/areaGrid';
import { Header } from '../components';
import EditBranchTemplate from '../components/templates/EditBranchTemplate';

// Memoized wrapper for EditBranchTemplate
const EditTemplateWrapper = memo(({ branchData }) => <EditBranchTemplate branchData={branchData} />);

// Separate component to satisfy no-unstable-nested-components
// const GridEditTemplate = ({ data }) => <EditTemplateWrapper branchData={data} />;
const GridEditTemplate = (props) => {
  console.log('GridEditTemplate props:', props);

  return <EditTemplateWrapper branchData={props} />;
};

const Area = () => {
  const { branches, fetchBranches, addBranch, updateBranch, deleteBranch } = useStateContext();

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search', 'Delete', 'Add', 'Edit'];

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const handleActionBegin = async (args) => {
    const newArgs = { ...args };

    if (newArgs.requestType === 'save') {
      if (newArgs.action === 'add') {
        try {
          await addBranch(newArgs.data);
          // toast.success('Branch created successfully');
        } catch {
          toast.error('Failed to create branch');
        }
      }
      if (newArgs.action === 'edit') {
        try {
          await updateBranch(newArgs.data._id, newArgs.data);
          // toast.success('Branch updated successfully');
        } catch {
          toast.error('Failed to update branch');
        }
      }
    }

    if (newArgs.requestType === 'delete') {
      // newArgs.cancel = true;
      const deletedRow = newArgs.data?.[0] || newArgs.promise?.[0];
      if (!deletedRow?._id) return;
      try {
        console.log('Deleting branch with ID:', deletedRow._id);
        await deleteBranch(deletedRow._id);
        // toast.success('Branch deleted successfully');
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="m-2 md:m-6 mt-6 p-2 md:p-4 bg-white rounded-2xl">
      <Header title="Area" />
      <GridComponent
        dataSource={branches}
        enableHover={false}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        editSettings={{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          mode: 'Dialog',
          template: GridEditTemplate, // use separate component
          dialog: { width: '1200px', minHeight: '500px' },
          showDeleteConfirmDialog: true
        }}
        toolbar={toolbarOptions}
        actionBegin={handleActionBegin}
        loadingIndicator={{ indicatorType: 'Shimmer' }}
      >
        <ColumnsDirective>
          {areaGrid.map((item, index) => (
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

export default Area;
