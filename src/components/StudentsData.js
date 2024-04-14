import { students } from "../data/students"

export const studentsData = students.map( student => {

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

