import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Selection, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import toast from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';
import { instructorsGrid } from '../data/instructorsGrid';
import { Header } from '../components';
import EditInstructorTemplate from '../components/templates/EditInstructorTemplate';

const GridEditTemplate = (props) => <EditInstructorTemplate instructorData={props} />;

const Instructors = () => {
  const { instructors, fetchInstructors, addInstructor, updateInstructor, deleteInstructor } = useStateContext();
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search', 'Delete', 'Add', 'Edit'];

  React.useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const handleActionBegin = async (args) => {
    const newArgs = { ...args };
    if (newArgs.requestType === 'save') {
      try {
        if (newArgs.action === 'add') {
          await addInstructor(newArgs.data);
        }
        if (newArgs.action === 'edit') {
          await updateInstructor(newArgs.data._id, newArgs.data);
        }
      } catch {
        toast.error('Save failed');
      }
    }

    if (args.requestType === 'delete') {
      const row = args.data?.[0];
      if (!row?._id) return;
      try {
        await deleteInstructor(row._id);
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="m-2 md:m-6 mt-6 p-2 md:p-4 bg-white rounded-2xl">
      <Header title="Instructors" />
      <GridComponent
        dataSource={instructors}
        enableHover={false}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
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
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {instructorsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page, Selection, Edit, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};
export default Instructors;
