import { useState } from "react"
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, } from "@tanstack/react-table"
import { studentsData } from "./StudentsData"
import { columnsDynamic } from "./columnsDynamic"

const StudentsTable = () => {

    // const columns = [
        // {
        //     header: 'First Name',
        //     accessorKey: 'first_name'
        // },
        // {
        //     header: 'Grades',
        //     accessorFn: row => row.grades[0].calification
        // }
        // {
        //     header: 'Last Name',
        //     accessorKey: 'last_name'
        // },
        // {
        //     header: 'Activity',
        //     accessorFn: row => console.log(row)
        // }
    // ]

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
        // getSortedRowModel: getSortedRowModel(),
        // state: sorting,
        // onSortingChange: setSorting
    })

  return (
    <div>
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