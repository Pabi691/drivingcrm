import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Selection, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { packagesList, packagesGrid } from '../data/dummy';
import { Header } from '../components';

const Packages = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search', 'Delete', 'Add', 'Edit', 'Update', 'Cancel'];
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, newRowPosition: 'Top' };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Packages" />
      <GridComponent
        dataSource={packagesList}
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
          {packagesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page, Selection, Edit, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Packages;
