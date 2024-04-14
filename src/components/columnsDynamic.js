import { activities } from "../data/activities"

export const columnsDynamic = activities.map( activity => {
    return {
        header: activity.title,
        accessorKey: activity.title
    }
})