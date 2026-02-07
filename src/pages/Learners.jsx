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
import { learnersGrid } from '../data/dummy';
import { Header } from '../components';
import EditLearnerTemplate from '../components/templates/EditLearnerTemplate';

const GridLearnerTemplate = (props) => {
  const { branches, packages, instructors } = useStateContext();



  return (
    <EditLearnerTemplate
      learnerData={props}
      branches={branches || []}
      packages={packages || []}
      instructors={instructors || []}
    />
  );
};

const Learners = () => {
  const {
    learners,
    fetchLearners,
    addLearner,
    updateLearner,
    instructors,
    deleteLearner,
    branches,
    packages,
  } = useStateContext();

  async function FetchLearner() {
    try {
      fetchLearners();
    } catch (error) {
      toast.error("failed to load learners")
    }
  }
  
  useEffect(() => {
    FetchLearner()
  }, [fetchLearners]);
  useEffect(() => {
    console.log('brnches', branches)
  }, [])

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        if (args.action === 'add') {
          await addLearner(args.data);
        }
        if (args.action === 'edit') {
          await updateLearner(args.data._id, args.data);
        }
      } catch {
        toast.error('Save failed');
      }
    }

    if (args.requestType === 'delete') {
      const row = args.data?.[0];
      if (!row?._id) return;
      try {
        console.log('id', row._id)
        await deleteLearner(row._id);
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="m-2 md:m-6 mt-6 p-2 md:p-4 bg-white rounded-2xl">
      <Header title="Pupils" />

      <GridComponent
        dataSource={learners}
        allowPaging
        allowSorting
        toolbar={['Search', 'Add', 'Edit', 'Delete']}
        actionBegin={handleActionBegin}
        editSettings={{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          mode: 'Dialog',
          template: GridLearnerTemplate,
          dialog: { width: '1000px', minHeight: '450px' },
          showDeleteConfirmDialog: true,
        }}
      >
        <ColumnsDirective>
          {learnersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Selection, Edit, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Learners;
