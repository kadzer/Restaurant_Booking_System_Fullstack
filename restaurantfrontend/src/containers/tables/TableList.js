import React from 'react';
import Table from '../../components/tables/Table'

const TableList = (props) => {

	const tables = props.tables.map((table) => {
	 	return <Table table={table} key={table.id}/>
	})

	return (
		<div className="table-list">
        <h1 className="heading">Tables</h1>


        <table className="table-table">
          <tbody>
            <tr>
              <th>Capacity</th>
              <th>Reserved</th>
              <th>Booking</th>
            </tr>
            {tables}
          </tbody>
        </table>
      </div>
	)
}

export default TableList;
