import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import { LandingPage } from '@/components/landing-page';

export default function Welcome() {
    return (
        <LandingPage />
    );
}
