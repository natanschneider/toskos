import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Status } from "@/types";
import { Form, Head } from "@inertiajs/react";

type Props = {
    users: User[];
    status: Status[];
};

export default function TasksManipulate({ users, status }: Props) {
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

                    <Form className="w-full">
                        {({ errors, processing }) => (
                            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" required />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input id="startDate" name="startDate" type="date" />
                                    <InputError message={errors.startDate} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input id="endDate" name="endDate" type="date" />
                                    <InputError message={errors.endDate} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="plannedStartDate">Planned Start Date</Label>
                                    <Input id="plannedStartDate" name="plannedStartDate" type="date" />
                                    <InputError message={errors.plannedStartDate} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="plannedEndDate">Planned End Date</Label>
                                    <Input id="plannedEndDate" name="plannedEndDate" type="date" />
                                    <InputError message={errors.plannedEndDate} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="responsible">Responsible</Label>
                                    <Select name="responsible">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a responsible" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.responsible} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="supervisor">Supervisor</Label>
                                    <Select name="supervisor">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a supervisor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.supervisor} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select name="status">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {status.map((stat) => (
                                                <SelectItem key={stat.id} value={stat.id.toString()}>
                                                    {stat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
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
                </div>
            </div>
        </>
    );
}
