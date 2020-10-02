import React from "react";
import { useSelector } from 'react-redux'
import { vouchersSelector } from '../slices/vouchers'
import DataGrid, {
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
  Export,
  Selection,
  FilterRow,
  ColumnChooser,
  ColumnFixing,
} from 'devextreme-react/data-grid';

export default function VoucherTable() {
  const { vouchers, cols } = useSelector(vouchersSelector)

  return (
    <div style={{ paddingTop: '0.5rem' }}>
      <DataGrid
        dataSource={vouchers.recordset}
        defaultColumns={cols}
        allowColumnReordering={true}
        allowColumnResizing={true}
        showBorders={true}
      >
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
        <Selection mode="multiple" />
        <FilterRow visible={true} />
        <GroupPanel visible={true} />
        <SearchPanel visible={true} />
        <Grouping autoExpandAll={false} />
        <Paging defaultPageSize={20} />
        <Export enabled={true} allowExportSelectedData={true} />

      </DataGrid>
    </div>
  )
}