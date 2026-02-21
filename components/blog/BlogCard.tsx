import Image from 'next/image';
import Link from 'next/link';
import type { DrupalArticle } from '@/lib/types';
import { absoluteUrl, formatDate } from '@/lib/utils';

interface BlogCardProps {
  article: DrupalArticle;
}

export default function BlogCard({ article }: BlogCardProps) {
  // Get image URL
  const imageUrl = article.field_image?.uri?.url
    ? absoluteUrl(article.field_image.uri.url)
    : '/images/default-article.jpg';

  const imageAlt = article.field_image?.resourceIdObjMeta?.alt || article.title;

  // Get article path
  const articlePath = article.path?.alias || `/node/${article.drupal_internal__nid}`;

  return (
    <article className="group">
      <Link href={articlePath} className="block">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {article.field_category && (
            <span className="absolute top-4 left-4 bg-primary text-[10px] font-black uppercase px-2 py-1 tracking-widest">
              {article.field_category.name}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          {article.field_category && (
            <>
              <span className="text-primary font-bold text-[10px] uppercase">
                {article.field_category.name}
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            </>
          )}
          <span className="text-gray-500 text-[10px] uppercase font-bold">
            {formatDate(article.created)}
          </span>
          {article.field_reading_time && (
            <>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="text-gray-500 text-[10px] uppercase font-bold">
                {article.field_reading_time} MIN READ
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-primary transition-colors leading-tight">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.field_excerpt && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {article.field_excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}
