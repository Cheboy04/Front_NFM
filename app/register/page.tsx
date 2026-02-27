
import type { Metadata } from 'next';
import AuthPage from '@/components/auth/AuthPage';

export const metadata: Metadata = {
title: 'Crear Cuenta | Nunca Fuimos Normales',
description: 'Únete a la comunidad del backstage.',
};

export default function RegisterPage() {
return <AuthPage defaultTab="register" />;
}
