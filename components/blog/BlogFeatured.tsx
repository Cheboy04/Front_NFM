import Image from 'next/image';
import Link from 'next/link';
import type { DrupalArticle } from '@/lib/types';
import { absoluteUrl } from '@/lib/utils';

interface BlogFeaturedProps {
  article: DrupalArticle;
}

export default function BlogFeatured({ article }: BlogFeaturedProps) {
  const imageUrl = article.field_image?.uri?.url
    ? absoluteUrl(article.field_image.uri.url)
    : '/images/default-featured.jpg';

  const imageAlt = article.field_image?.resourceIdObjMeta?.alt || article.title;
  const articlePath = article.path?.alias || `/node/${article.drupal_internal__nid}`;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 flex flex-col md:flex-row">
      {/* Image Side */}
      <div className="md:w-1/2 aspect-[16/9] md:aspect-auto overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content Side */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        {article.field_category && (
          <span className="text-vintage-gold font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">
            {article.field_category.name}
          </span>
        )}

        <Link href={articlePath}>
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 leading-[1.1] group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </Link>

        {article.field_excerpt && (
          <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
            {article.field_excerpt}
          </p>
        )}

        <div>
          <Link
            href={articlePath}
            className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all inline-block"
          >
            DESCUBRIR LA HISTORIA
          </Link>
        </div>
      </div>
    </article>
  );
}
