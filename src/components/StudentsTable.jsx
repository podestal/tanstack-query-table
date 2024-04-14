import { useState } from "react"
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { studentsData } from "./StudentsData"
import { columnsDynamic } from "./columnsDynamic"

const StudentsTable = () => {

    const columns = [        
        {
            header: 'First Name',
            accessorKey: 'firstName'
        },
        {
            header: 'Last Name',
            accessorKey: 'lastName'
        },
        ...columnsDynamic
    ]

    const [sorting, setSorting] = useState([])
    const [filter, setFilter] = useState('')

    const table = useReactTable({
        data: studentsData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filter
        },
        onGlobalFilterChange: setFilter,
        getSortedRowModel: getSortedRowModel(),
        // state: sorting,
        onSortingChange: setSorting
    })

  return (
    <div>
        <input type="text" value={filter} onChange={e => setFilter(e.target.value)}/>
        <table>
            <thead>
                {
                    table.getHeaderGroups().map( headerGroup => (
                        <tr 
                            key={headerGroup.id}
                        >
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
                                    <td key={cell.id}>
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

export default StudentsTable