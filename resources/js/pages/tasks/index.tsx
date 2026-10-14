import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { index } from "@/routes/task";
import { Task } from "@/types";
import { Head } from "@inertiajs/react";

type Props = {
    tasks?: Task[];
};

export default function TasksIndex({ tasks }: Props) {
    return (
        <>
            <Head title="Tasks" />

            <h1 className="sr-only">Tasks</h1>

            <div className="flex flex-col space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        variant="small"
                        title="Teams"
                        description="Manage your teams and team memberships"
                    />

                    <Button>Create Task</Button>
                </div>

                <div className="space-y-3">
                    {(tasks?.length === 0 || (! tasks)) ? (
                        <p className="py-8 text-center text-muted-foreground">
                            No tasks found
                        </p>
                    ) : null}

                    {tasks?.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between gap-4 rounded-lg border p-4"
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{ task.name }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
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
