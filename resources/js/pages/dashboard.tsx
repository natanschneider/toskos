import { FolderPlus, ListTodo, Rocket } from 'lucide-react';

export default function Dashboard() {
    const steps = [
        {
            icon: FolderPlus,
            title: 'Create a project',
            description:
                'Start by giving your project a name. It will be the space where all of your work stays organized.',
        },
        {
            icon: ListTodo,
            title: 'Add your tasks',
            description:
                'Inside the project, add the tasks that need to get done and keep track of the progress of each one.',
        },
        {
            icon: Rocket,
            title: 'Track and complete',
            description:
                'Mark tasks as done and watch your project move forward all the way to the finish line.',
        },
    ];

    return (
        <main className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <header className="flex flex-col items-center text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                        Getting started
                    </span>
                    <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                        Welcome to your task manager
                    </h1>
                    <p className="mt-3 max-w-md leading-relaxed text-pretty text-muted-foreground">
                        To get started, create your first{' '}
                        <span className="font-medium text-foreground">
                            project
                        </span>{' '}
                        and then add the{' '}
                        <span className="font-medium text-foreground">
                            tasks
                        </span>{' '}
                        inside it.
                    </p>
                </header>

                <ol className="mt-10 flex flex-col gap-4">
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 sm:p-5"
                        >
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <step.icon
                                    className="size-5"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-muted-foreground">
                                        Step {index + 1}
                                    </span>
                                </div>
                                <h2 className="text-base leading-6 font-medium">
                                    {step.title}
                                </h2>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="mt-8 flex flex-col items-center gap-3">
                    <p className="text-xs text-muted-foreground">
                        You&apos;ll be able to add tasks as soon as the project
                        is created.
                    </p>
                </div>
            </div>
        </main>
    );
}
