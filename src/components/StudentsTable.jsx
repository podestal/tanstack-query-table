import { useState } from "react"
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table"
import { students } from "../data/students"
import { grades } from "../data/grades"
import { activities } from "../data/activities"

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


    const columnsDynamic = activities.map( activity => {
        return {
            header: String(activity.title),
            accessorKey: String(activity.title)
        }
    })

    // const columnsDynamic = studentsData.map( student => {

    //     return {
    //         header: String(student.grades[idx].activity.title),
    //         accessorFn: row => row.grades[idx].calification
    //         header: student.firstName,
    //         accessorFn: row => row.firstName
    //     }
    // })

    // const columnsDynamic = studentsData.map( (student, idx) => {
    //     return {
    //         header: Object.keys(student.gradesActivity[idx])[0],
    //         accessorFn: row => {
    //             // console.log('row',row)
    //         }
    //     }
    // })

    // const columnsDynamic = studentsData && studentsData.map( (student) => {
    //     console.log(student.firstName)
    //     return student.gradesActivity.map( grade => ({
    //         header: String(grade.activity),

    //     }))

    // })

    const table = useReactTable({
        data: studentsData,
        columns: columnsDynamic,
        getCoreRowModel: getCoreRowModel()
    })

  return (
    <div>
        {console.log('studentsData', studentsData)}
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