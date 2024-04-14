import { useState } from "react"
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, } from "@tanstack/react-table"
import { students } from "../data/students"
import { grades } from "../data/grades"
import { activities } from "../data/activities"

const StudentsTable = () => {

    const studentsData = students.map( student => {

        const gradesActivity = student.grades.map( grade => {
            const activity = String(grade.activity.title)
            const obj = {}
            obj[activity] = grade.calification
            return {
                ...obj
            }
        })

        return Object.assign({            
            'firstName': student.first_name,
            'lastName': student.last_name,
        }, ...gradesActivity)

    })

    const columns = [        
        {
            header: 'First Name',
            accessorKey: 'firstName'
        },
        {
            header: 'Last Name',
            accessorKey: 'lastName'
        },
        // ...columnsDynamic
    ]

    const [sorting, setSorting] = useState([])
    const [name, setName] = useState('')

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
        <input 
    
        />
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