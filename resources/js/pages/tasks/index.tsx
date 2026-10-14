import { index } from "@/routes/task";
import { Task } from "@/types";

type Props = {
    tasks?: Task[];
};

export default function TasksIndex({ tasks }: Props) {
    return (
        <></>
    )
}

TasksIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Tasks',
            href: props.currentTeam ? index(props.currentTeam.slug) : '/'
        },
    ],
});
