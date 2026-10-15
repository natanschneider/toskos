import Heading from "@/components/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { index } from "@/routes/task";
import { Task } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";

type Props = {
    tasks?: Task[];
};

export default function TasksIndex({ tasks }: Props) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return tasks;

        return tasks?.filter((task) => {
            return task.name.toLowerCase().includes(q);
        });
    }, [tasks, query]);

    return (
        <>
            <Head title="Tasks" />

            <h1 className="sr-only">Tasks</h1>

            <div className="flex flex-col space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        variant="small"
                        title="Tasks"
                        description="Manage your tasks"
                    />

                    <Button>Create Task</Button>
                </div>
                <div className="flex items-center justify-between">
                    <Input
                        id="input-button-group"
                        placeholder="Type to search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="space-y-3">
                    {(tasks?.length === 0 || (! tasks)) ? (
                        <p className="py-8 text-center text-muted-foreground">
                            No tasks found
                        </p>
                    ) : null}

                    {filtered?.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between gap-4 rounded-lg border p-4"
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{task.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge>{task.responsible?.name}</Badge>
                                <Badge>{task.status.name}</Badge>
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
