"use client";

import { useState } from "react";
import {
    ArrowRight,
    Check,
    ChevronDown,
    CircleHelp,
    FileText,
    Layers3,
    Menu,
    Plus,
    Search,
    Sparkles,
    Users,
    X,
} from "lucide-react";
import AppLogo from "./app-logo";
import { Link, usePage } from "@inertiajs/react";
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import AppLogoIcon from "./app-logo-icon";

const features = [
    {
        icon: Layers3,
        title: "Tarefas dentro de tarefas",
        text: "Quebre projetos complexos em passos claros, sem perder o contexto do trabalho.",
    },
    {
        icon: FileText,
        title: "Documentação no lugar certo",
        text: "Anexe decisões, briefings e guias diretamente a cada tarefa para o time encontrar tudo.",
    },
    {
        icon: Users,
        title: "Feito para times",
        text: "Alinhe pessoas, prazos e prioridades em um espaço compartilhado e simples.",
    },
];

const faqs = [
    [
        "O que é o Toskos?",
        "Toskos é um espaço de trabalho para organizar tarefas, subtarefas e documentação em um só lugar.",
    ],
    [
        "Posso usar com meu time?",
        "Sim. Toskos foi pensado para times que precisam colaborar, documentar e acompanhar o trabalho juntos.",
    ],
    [
        "Preciso instalar alguma coisa?",
        "Não. Você pode começar direto pelo navegador e convidar seu time quando estiver pronto.",
    ],
];

function Logo() {
    return (
        <AppLogo />
    );
}

function MockWorkspace() {
    return (
        <div className="relative mx-auto w-full max-w-5xl rounded-[22px] border border-[#dcd9d2] bg-[#f7f6f2] p-2 shadow-[0_30px_80px_-35px_rgba(0,0,0,.35)] sm:p-3">
            <div className="overflow-hidden rounded-[15px] border border-[#e4e1da] bg-white">
                <div className="flex h-11 items-center justify-between border-b border-[#eceae5] px-4 sm:px-5">
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>
                    <div className="hidden items-center gap-5 text-[10px] text-[#8b8983] sm:flex">
                        <span>Meu trabalho</span>
                        <span>Projetos</span>
                        <span>Documentação</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-5 rounded-full bg-[#d9d3c8]" />
                        <div className="size-5 rounded-full bg-[#eae7e1]" />
                    </div>
                </div>
                <div className="grid min-h-[280px] grid-cols-1 sm:grid-cols-[145px_1fr]">
                    <aside className="hidden border-r border-[#eceae5] p-4 sm:block">
                    </aside>
                    <div className="p-5 sm:p-7">
                        <div className="mb-6 flex items-end justify-between">
                            <div>
                                <p className="text-[10px] text-[#a19d95]">
                                    Segunda, 12 de maio
                                </p>
                                <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#24231f]">
                                    Bom dia, Marina
                                </h3>
                            </div>
                            <button className="flex items-center gap-1.5 rounded-md bg-[#171717] px-3 py-2 text-[10px] font-medium text-white">
                                <Plus className="size-3" /> Nova tarefa
                            </button>
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-lg border border-[#ebe8e2] p-3">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-[10px] font-semibold">
                                        A fazer
                                    </span>
                                    <span className="text-[10px] text-[#aaa69e]">
                                        3
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="rounded-md border border-[#eeeae4] bg-[#fcfbf9] p-2">
                                        <p className="text-[10px] font-medium">
                                            Definir escopo do projeto
                                        </p>
                                        <p className="mt-2 text-[9px] text-[#aaa69e]">
                                            Hoje · Produto
                                        </p>
                                    </div>
                                    <div className="rounded-md border border-[#eeeae4] bg-[#fcfbf9] p-2">
                                        <p className="text-[10px] font-medium">
                                            Revisar documentação
                                        </p>
                                        <p className="mt-2 text-[9px] text-[#aaa69e]">
                                            Amanhã · Docs
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-[#ebe8e2] p-3">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-[10px] font-semibold">
                                        Em andamento
                                    </span>
                                    <span className="text-[10px] text-[#aaa69e]">
                                        2
                                    </span>
                                </div>
                                <div className="rounded-md border border-[#eeeae4] bg-[#fcfbf9] p-2">
                                    <div className="mb-2 flex items-center gap-1.5">
                                        <span className="size-1.5 rounded-full bg-[#d89b54]" />
                                        <p className="text-[10px] font-medium">
                                            Página de lançamento
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-[9px] text-[#aaa69e]">
                                        <span>3 subtarefas</span>
                                        <span>70%</span>
                                    </div>
                                    <div className="mt-2 h-1 rounded-full bg-[#eeeae4]">
                                        <div className="h-1 w-[70%] rounded-full bg-[#d89b54]" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-[#ebe8e2] p-3">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-[10px] font-semibold">
                                        Concluído
                                    </span>
                                    <span className="text-[10px] text-[#aaa69e]">
                                        5
                                    </span>
                                </div>
                                <div className="rounded-md border border-[#eeeae4] bg-[#fcfbf9] p-2 opacity-70">
                                    <div className="flex items-center gap-2">
                                        <span className="flex size-3 items-center justify-center rounded-full bg-[#6d9270] text-white">
                                            <Check className="size-2" />
                                        </span>
                                        <p className="text-[10px] font-medium line-through">
                                            Pesquisa com usuários
                                        </p>
                                    </div>
                                    <p className="mt-2 pl-5 text-[9px] text-[#aaa69e]">
                                        Concluído ontem
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LandingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const { auth, currentTeam } = usePage().props;
    const dashboardUrl = currentTeam ? dashboard(currentTeam.slug) : '/';

    return (
        <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-[#171717]">
            <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
                <a href="#top" className="flex items-center gap-2">
                    <Logo />
                </a>
                <div className="hidden items-center gap-8 text-sm text-[#6f6b63] md:flex">
                    <a href="#como-funciona" className="hover:text-[#171717]">
                        Como funciona
                    </a>
                    <a href="#recursos" className="hover:text-[#171717]">
                        Recursos
                    </a>
                    <a href="#faq" className="hover:text-[#171717]">
                        Perguntas
                    </a>
                </div>
                <div className="hidden items-center gap-5 text-sm md:flex">
                    {auth.user ? (
                        <Link
                            href={dashboardUrl}
                            className="inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal"
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                className="inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <button
                    aria-label="Abrir menu"
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X /> : <Menu />}
                </button>
            </nav>
            {menuOpen && (
                <div className="border-y border-[#e8e5df] bg-[#fbfaf7] px-5 py-4 md:hidden">
                    <div className="flex flex-col gap-4 text-sm">
                        <a
                            href="#como-funciona"
                            onClick={() => setMenuOpen(false)}
                        >
                            Como funciona
                        </a>
                        <a href="#recursos" onClick={() => setMenuOpen(false)}>
                            Recursos
                        </a>
                        <a href="#faq" onClick={() => setMenuOpen(false)}>
                            Perguntas
                        </a>
                        <a href="#comecar" className="font-semibold">
                            Começar agora →
                        </a>
                    </div>
                </div>
            )}
            <section
                id="top"
                className="px-5 pb-20 pt-16 text-center sm:pt-24 lg:pb-28"
            >
                <div className="mx-auto max-w-4xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e4e0d8] bg-white px-3 py-1.5 text-xs text-[#77736b]">
                        <Sparkles className="size-3.5" /> Organize o trabalho.
                        Compartilhe o contexto.
                    </div>
                    <h1 className="text-balance text-5xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
                        O trabalho do seu time,{" "}
                        <span className="text-[#aaa69e]">no lugar certo.</span>
                    </h1>
                    <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-7 text-[#77736b] sm:text-lg">
                        Toskos conecta tarefas, subtarefas e documentação para
                        seu time trabalhar com clareza — do primeiro rascunho à
                        entrega.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href={login()}
                            className="rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343330]"
                        >
                            Comece gratuitamente{" "}
                            <ArrowRight className="ml-2 inline size-4" />
                        </Link>
                        <a
                            href="#como-funciona"
                            className="rounded-full border border-[#dedad2] bg-white px-6 py-3 text-sm font-medium text-[#4f4c46] hover:border-[#aaa69e]"
                        >
                            Veja como funciona
                        </a>
                    </div>
                </div>
                <div className="mt-16 sm:mt-20">
                    <MockWorkspace />
                </div>
            </section>
            <section
                id="como-funciona"
                className="border-y border-[#e8e5df] bg-[#f4f2ed] px-5 py-20 sm:py-28"
            >
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-end">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-[#a19d95]">
                                Menos abas. Mais avanço.
                            </p>
                            <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
                                Tudo que você precisa para fazer acontecer.
                            </h2>
                        </div>
                        <p className="max-w-md text-base leading-7 text-[#77736b]">
                            Um espaço calmo para transformar ideias em entregas.
                            Cada detalhe fica conectado ao trabalho que importa.
                        </p>
                    </div>
                    <div
                        id="recursos"
                        className="mt-14 grid gap-4 md:grid-cols-3"
                    >
                        {features.map(({ icon: Icon, title, text }) => (
                            <article
                                key={title}
                                className="rounded-2xl border border-[#dfdcd5] bg-[#fbfaf7] p-6"
                            >
                                <div className="mb-12 flex size-10 items-center justify-center rounded-xl bg-[#e9e5dc]">
                                    <Icon className="size-5 text-[#494640]" />
                                </div>
                                <h3 className="text-lg font-semibold tracking-tight">
                                    {title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-[#77736b]">
                                    {text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section className="px-5 py-20 sm:py-28">
                <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-[#a19d95]">
                            Contexto compartilhado
                        </p>
                        <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
                            Uma tarefa nunca precisa ficar sozinha.
                        </h2>
                        <p className="mt-5 max-w-md leading-7 text-[#77736b]">
                            Adicione subtarefas, links, arquivos e documentação
                            sem espalhar o conhecimento em ferramentas
                            diferentes.
                        </p>
                        <a
                            href="#comecar"
                            className="mt-7 inline-flex items-center rounded-full border border-[#dedad2] px-5 py-3 text-sm font-medium hover:border-[#aaa69e]"
                        >
                            Conheça o workspace{" "}
                            <ArrowRight className="ml-2 size-4" />
                        </a>
                    </div>
                    <div className="rounded-2xl border border-[#e3dfd7] bg-[#f7f5f0] p-5 sm:p-8">
                        <div className="rounded-xl border border-[#e3dfd7] bg-white p-5">
                            <div className="flex items-center justify-between border-b border-[#eeeae4] pb-4">
                                <div>
                                    <p className="text-xs text-[#aaa69e]">
                                        Projeto · Lançamento
                                    </p>
                                    <h3 className="mt-1 font-semibold">
                                        Página de lançamento
                                    </h3>
                                </div>
                                <CircleHelp className="size-4 text-[#aaa69e]" />
                            </div>
                            <div className="flex flex-col gap-3 pt-4 text-sm">
                                <div className="flex items-center gap-3 rounded-lg bg-[#f7f5f0] p-3">
                                    <span className="flex size-5 items-center justify-center rounded-full bg-[#6d9270] text-white">
                                        <Check className="size-3" />
                                    </span>
                                    <span className="line-through text-[#8e8a82]">
                                        Definir mensagem principal
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border border-[#e9e5de] p-3">
                                    <span className="flex size-5 items-center justify-center rounded-full border border-[#cfc9bf]">
                                        <Search className="size-3 text-[#aaa69e]" />
                                    </span>
                                    <span>Revisar com o time</span>
                                </div>
                                <div className="ml-8 flex items-center gap-2 border-l-2 border-[#e7e1d6] py-2 pl-4 text-xs text-[#8e8a82]">
                                    <FileText className="size-3.5" /> Briefing
                                    da campanha{" "}
                                    <span className="ml-auto">→</span>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border border-dashed border-[#d9d3c9] p-3 text-[#aaa69e]">
                                    <Plus className="size-4" /> Adicionar
                                    subtarefa
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="faq"
                className="border-t border-[#e8e5df] bg-[#f4f2ed] px-5 py-20 sm:py-24"
            >
                <div className="mx-auto max-w-3xl">
                    <div className="text-center">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-[#a19d95]">
                            Perguntas frequentes
                        </p>
                        <h2 className="text-4xl font-semibold tracking-[-.04em]">
                            Antes de começar
                        </h2>
                    </div>
                    <div className="mt-10 flex flex-col divide-y divide-[#dedad2]">
                        {faqs.map(([q, a], i) => (
                            <div key={q} className="py-5">
                                <button
                                    className="flex w-full items-center justify-between text-left font-medium"
                                    onClick={() =>
                                        setOpenFaq(openFaq === i ? null : i)
                                    }
                                >
                                    {q}
                                    <ChevronDown
                                        className={`size-4 transition ${openFaq === i ? "rotate-180" : ""}`}
                                    />
                                </button>
                                {openFaq === i && (
                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#77736b]">
                                        {a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="comecar" className="px-5 py-24 text-center sm:py-32">
                <div className="mx-auto max-w-2xl">
                    <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl bg-[#171717] text-white">
                        <AppLogoIcon />
                    </div>
                    <h2 className="text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
                        Dê clareza ao seu trabalho.
                    </h2>
                    <p className="mx-auto mt-5 max-w-md leading-7 text-[#77736b]">
                        Comece com seu time hoje. Organizar o trabalho pode ser
                        simples.
                    </p>
                    <Link
                        href={login()}
                        className="mt-8 inline-flex rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white hover:bg-[#343330]"
                    >
                        Começar gratuitamente{" "}
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </div>
            </section>
            <footer className="border-t border-[#e8e5df] px-5 py-8">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-[#918d85] sm:flex-row">
                    <div className="flex items-center gap-2 text-[#171717]">
                        <Logo />
                    </div>
                    <span>Feito para times que fazem acontecer.</span>
                    <span>© 2026 Toskos</span>
                </div>
            </footer>
        </main>
    );
}
