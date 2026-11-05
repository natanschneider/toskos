import TaskController, { create, edit } from '@/actions/App/Http/Controllers/TaskController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import TextEditor from '@/components/text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { User, Status, Task, Comment } from '@/types';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { Badge } from '@/components/ui/badge';
import { index } from '@/routes/task';
import CommentController from '@/actions/App/Http/Controllers/CommentController';

type Props = {
    users: User[];
    status: Status[];
    task: Task[];
    doc: string;
    parent_task: string;
    children?: Task[];
    comments?: Comment[];
};

export default function TasksManipulate({ users, status, task, doc, parent_task, children, comments }: Props) {
    const { currentTeam } = usePage().props;
    const editorRef = useRef<MDXEditorMethods>(null);
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return children;

        return children?.filter((task) => {
            return task.name.toLowerCase().includes(q);
        });
    }, [children, query]);

    return (
        <>
            <Head title="Task" />
            <h1 className="sr-only">Task</h1>

            <div className="flex flex-col space-y-10 p-6">
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Tasks"
                        description="Update or create your task information"
                    />

                    <Form
                        {...(
                            task ? TaskController.manipulate.form({ current_team: currentTeam.slug, task: task[0].id })
                            : TaskController.store.form(currentTeam.slug)
                        )}
                        className="w-full"
                        transform={(data) => ({
                            ...Object.fromEntries(
                                Object.entries(data).filter(
                                    ([, value]) =>
                                        value !== '' &&
                                        value !== null &&
                                        value !== undefined,
                                ),
                            ),
                            markdown: editorRef.current?.getMarkdown() ?? '',
                        })}
                    >
                        {({ errors, processing }) => (
                            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                { parent_task ? ( <input type='hidden' name='parent' id='parent' value={parent_task} /> ) : null}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" required defaultValue={task ? task[0].name : undefined} />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="startDate">
                                        Start Date
                                    </Label>
                                    <Input
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        defaultValue={task ? task[0].start_date?.substring(0, 10) : undefined}
                                    />
                                    <InputError message={errors.startDate} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input
                                        id="endDate"
                                        name="endDate"
                                        type="date"
                                        defaultValue={task ? task[0].end_date?.substring(0, 10) : undefined}
                                    />
                                    <InputError message={errors.endDate} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="plannedStartDate">
                                        Planned Start Date
                                    </Label>
                                    <Input
                                        id="plannedStartDate"
                                        name="plannedStartDate"
                                        type="date"
                                        defaultValue={task ? task[0].planned_start_date?.substring(0, 10) : undefined}
                                    />
                                    <InputError
                                        message={errors.plannedStartDate}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="plannedEndDate">
                                        Planned End Date
                                    </Label>
                                    <Input
                                        id="plannedEndDate"
                                        name="plannedEndDate"
                                        type="date"
                                        defaultValue={task ? task[0].planned_end_date?.substring(0, 10) : undefined}
                                    />
                                    <InputError
                                        message={errors.plannedEndDate}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="responsible">
                                        Responsible
                                    </Label>
                                    <Select name="responsible" defaultValue={task ? task[0].responsible?.id.toString() : undefined}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a responsible" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                >
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.responsible} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="supervisor">
                                        Supervisor
                                    </Label>
                                    <Select name="supervisor" defaultValue={task ? task[0].supervisor?.toString() : undefined}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a supervisor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                >
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.supervisor} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select name="status" defaultValue={task ? task[0].status_id.toString() : undefined}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {status.map((stat) => (
                                                <SelectItem
                                                    key={stat.id}
                                                    value={stat.id.toString()}
                                                >
                                                    {stat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>

                                <div className="col-span-1 w-full gap-2 md:col-span-2 lg:col-span-3">
                                    <TextEditor
                                        editorRef={editorRef}
                                        markdown={doc ? doc : ''}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        data-test="team-save-button"
                                        disabled={processing}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form>

                    {task && (
                        <div className='flex flex-col space-y-6 p-4'>
                            <div className="flex items-center justify-between">
                                <Heading
                                    variant="small"
                                    title="Tasks"
                                    description="Manage your tasks"
                                />

                                <Link
                                    href={
                                        create({
                                            current_team: currentTeam.slug,
                                            parent_task: task[0].id,
                                        }).url
                                    }
                                >
                                    <Button>Create Task</Button>
                                </Link>
                            </div>
                            <div className="flex items-center justify-between">
                                <Input
                                    id="input-button-group"
                                    placeholder="Type to search..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div className='space-y-3'>
                                {children?.length === 0 ? (
                                    <p className='py-8 text-center text-muted-foreground'>No tasks found</p>
                                ) : null}
                            </div>

                            {filtered?.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={
                                                        edit({
                                                            current_team:
                                                                currentTeam.slug,
                                                            task: task.id,
                                                        }).url
                                                    }
                                                    className="font-medium"
                                                >
                                                    {task.name}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge>{task.responsible?.name}</Badge>
                                        <Badge>{task.status.name}</Badge>
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-center justify-between">
                                <Heading
                                    variant="small"
                                    title="Comments"
                                    description="View task comments"
                                />
                            </div>
                            <Form
                                {...CommentController.create.form(currentTeam?.slug)}
                                className='flex items-center justify-between'
                                transform={(data) => ({
                                    ...Object.fromEntries(
                                        Object.entries(data).filter(
                                            ([, value]) =>
                                                value !== '' &&
                                                value !== null &&
                                                value !== undefined,
                                        ),
                                    ),
                                })}
                            >
                                <input type='hidden' name='task' id='task' value={task[0].id} />
                                <Input
                                    maxLength={500}
                                    name='comment'
                                    id='comment'
                                />

                                <Button type='submit'>Create Comment</Button>
                            </Form>
                            <div className='space-y-3'>
                                {comments?.length === 0 ? (
                                    <p className='py-8 text-center text-muted-foreground'>No comments found</p>
                                ) : null}
                            </div>
                            {comments?.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge>{comment.user.name}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

TasksManipulate.layout = (props: {
    currentTeam?: { slug: string } | null;
    task?: Task[];
}) => ({
    breadcrumbs: [
        {
            title: 'Tasks',
            href: props.currentTeam ? index(props.currentTeam.slug) : '/',
        },
        {
            title: props?.task ? props?.task[0]?.name : 'Create task',
            href: props?.task ? edit({ current_team: props.currentTeam.slug, task: props.task[0].id}) : ( props.currentTeam ? create({ current_team: props.currentTeam.slug}) : '/')
        }
    ],
});
