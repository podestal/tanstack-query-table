import { useState } from "react"
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table"
import { students } from "../data/students"
import { grades } from "../data/grades"

const StudentsTable = () => {

    const columns = [
        {
            header: 'First Name',
            accessorKey: 'first_name'
        },
        {
            header: 'Grades',
            accessorFn: row => row.grades[0].calification
        }
        // {
        //     header: 'Last Name',
        //     accessorKey: 'last_name'
        // },
        // {
        //     header: 'Activity',
        //     accessorFn: row => console.log(row)
        // }
    ]

    // const [columnsDynamic, setColumnsDynamic] = useState([
    //     {
    //         header: 'First Name',
    //         accessorKey: 'first_name'
    //     },
    // ])

    const studentsData = students.map( student => {

        console.log('student', student?.grades[2].activity.title);

        return {
            'firstName': student.first_name,
            'lastName': student.last_name
        }
    })

    const columnsDynamic = students.map( (student, idx) => {

        return {
            header: String(student.grades[idx].activity.title),
            accessorFn: row => row.grades[idx].calification
        }
    })

    

    const table = useReactTable({
        data: students,
        columns: [
            {
                header: 'First Name',
                accessorKey: 'first_name'
            },
            {
                header: 'Last Name',
                accessorKey: 'last_name'
            },
            ...columnsDynamic
        ],
        getCoreRowModel: getCoreRowModel()
    })

  return (
    <div>
        {/* {console.log('StudentsData',studentsData)} */}
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

export default StudentsTable