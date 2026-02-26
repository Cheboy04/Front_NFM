import type { Metadata } from 'next';
import AboutPage from '@/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'Nosotros | Nunca Fuimos Normales',
  description:
    'Conoce la historia detrás del podcast definitivo sobre la cultura del rock. Investigamos los archivos olvidados para traerte la verdad detrás de las leyendas.',
  openGraph: {
    title: 'Nosotros | Nunca Fuimos Normales',
    description: 'No contamos la historia oficial. Contamos la historia REAL.',
    type: 'website',
  },
};

export default function About() {
  return <AboutPage />;
}
