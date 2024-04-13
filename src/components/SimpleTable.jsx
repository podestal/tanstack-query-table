import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table'
import data from '../data/MOCK_DATA.json'
import { useState } from 'react'

const SimpleTable = () => {

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'myId'
        },
        {
            header: 'Full Name',
            columns: [
                {
                    header: 'Name',
                    accessorKey: 'name'
                },
                {
                    header: 'Lastname',
                    accessorKey: 'lastname'
                },
            ]
        },
        // {
        //     header: 'Full name',
        //     accessorFn: row => `${row.name} ${row.lastname}`
        // },
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

    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        },
        onSortingChange: setSorting
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
                                    <th 
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.placeholderId ? null : header.column.columnDef.header}
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
            <tfoot>
                {
                    table.getFooterGroups
                }
            </tfoot>
        </table>
    </div>
  )
}

export default SimpleTable