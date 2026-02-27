import type { Metadata } from 'next';
import AuthPage from '@/components/auth/AuthPage';

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Nunca Fuimos Normales',
  description: 'Accede a tu cuenta y descubre el lado B del rock.',
};

export default function LoginPage() {
  return <AuthPage defaultTab="login" />;
}

