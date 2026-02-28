import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';
import { getShowEpisodes } from '@/lib/spotify';

export const metadata: Metadata = {
  title: 'Contacto | Nunca Fuimos Normales',
  description:
    '¿Tenés una historia que merece ser contada? ¿Querés colaborar? El micrófono está abierto.',
  openGraph: {
    title: 'Contacto | Nunca Fuimos Normales',
    description: 'Hablemos de rock. Sugerí una banda, colaborá con nosotros o escribinos.',
    type: 'website',
  },
};

export default async function Contact() {
  const episodes = await getShowEpisodes(1);
  const latestEpisode = episodes[0] ?? null;

  return <ContactPage latestEpisode={latestEpisode} />;
}
