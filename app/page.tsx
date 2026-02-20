import { ArticleTeaser } from "@/components/drupal/ArticleTeaser"
import { drupal } from "@/lib/drupal"
import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"
import Link from "next/link"
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CTASection from '@/components/home/CTASection';
import AboutSection from '@/components/home/AboutSection';

export const metadata: Metadata = {
  title: 'Nunca Fuimos Normales | El Lado B del Disco',
  description:
    'Historias no contadas del rock que marcó generaciones. Desde los excesos en el backstage hasta los mitos urbanos de los 70s y 90s.',
  keywords: ['rock', 'podcast', 'música', 'historia del rock', 'backstage', '70s', '80s', '90s'],
  openGraph: {
    title: 'Nunca Fuimos Normales | El Lado B del Disco',
    description:
      'Historias no contadas del rock que marcó generaciones. El podcast definitivo sobre la cultura del rock and roll.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nunca Fuimos Normales | El Lado B del Disco',
    description: 'Historias no contadas del rock que marcó generaciones.',
  },
};

export default async function Home() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
      next: {
        revalidate: 3600,
      },
    }
  )

  return (
    <>
    <Layout>
          <HeroSection />
    
          {/* Latest Episodes Section - Placeholder para implementar después */}
          <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
                  ÚLTIMOS CAPÍTULOS
                </h3>
                <div className="h-1.5 w-24 bg-primary"></div>
              </div>
              <Link
                href="/blogs"
                className="text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-primary/20 hover:border-primary pb-1 transition-all"
              >
                Ver todos
              </Link>
            </div>
            {/* Aquí irán los episodios - se implementará después con datos de Drupal */}
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg">Los episodios se cargarán desde Drupal...</p>
            </div>
          </section>
    
          <CTASection />
          {/* <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
            {nodes?.length ? (
              nodes.map((node) => (
                <div key={node.id}>
                  <ArticleTeaser node={node} />
                  <hr className="my-20" />
                </div>
              ))
            ) : (
              <p className="py-4">No nodes found</p>
            )} */}
    
          {/* Backstage Blog Section - Placeholder */}
          <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
            <div className="flex flex-col mb-16">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
                HISTORIAS DESDE EL BACKSTAGE
              </h3>
              <div className="h-1.5 w-24 bg-primary"></div>
            </div>
            {/* Aquí irán los artículos del blog - se implementará después con datos de Drupal */}
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg">Los artículos se cargarán desde Drupal...</p>
            </div>
          </section>
    
          <AboutSection />
        </Layout>
      
    </>
  )
}
