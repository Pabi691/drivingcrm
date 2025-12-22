import React, { useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Selection, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { enquiriesGrid } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';
import ViewEnquiryCell from '../components/grid/ViewEnquiryCell';

const Enquiries = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search', 'Delete', 'Add', 'Edit', 'Update', 'Cancel'];
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, newRowPosition: 'Top' };
  const { enquiries, setEnquiries } = useStateContext();

  const templateMap = {
    viewEnquiry: ViewEnquiryCell,
  };

  useEffect(() => {
    setEnquiries(prev =>
        prev.map(enquiry =>
        enquiry.isViewed ? enquiry : { ...enquiry, isViewed: true }
        )
    );
    }, [ setEnquiries ]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Lessons" />

      <GridComponent
          dataSource={enquiries}
          enableHover={false}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionsettings}
          editSettings={editing}
          toolbar={toolbarOptions}
        >

        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {enquiriesGrid.map((item, index) => <ColumnDirective key={index} {...item} template={item.template ? templateMap[item.template] : undefined}/>)}
        </ColumnsDirective>

        <Inject services={[Search, Page, Selection, Edit, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Enquiries;
