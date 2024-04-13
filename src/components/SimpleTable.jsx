import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import data from '../data/MOCK_DATA.json'

const SimpleTable = () => {

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'Name',
            accessorKey: 'name'
        },
        {
            header: 'Lastname',
            accessorKey: 'lastname'
        },
        {
            header: 'Email',
            accessorKey: 'email'
        },
        {
            header: 'Country',
            accessorKey: 'country'
        },
        {
            header: 'Day of Birth',
            accessorKey: 'dateOfBirth'
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

  return (
    <div>
        <table>
            <thead>
                {
                    table.getHeaderGroups().map( headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map( header => (
                                    <th key={header.id}>
                                        {header.column.columnDef.header}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody>
                {
                    table.getRowModel().rows.map( row => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map( cell => (
                                    <td>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default SimpleTable