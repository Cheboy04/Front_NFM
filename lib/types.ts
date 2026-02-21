import type { DrupalNode, DrupalFile, DrupalTaxonomyTerm } from 'next-drupal';

// Re-export types from next-drupal for convenience
export type { DrupalNode, DrupalFile, DrupalTaxonomyTerm };

// Drupal Media (Images)
export interface DrupalMedia extends DrupalFile {
  uri: {
    value: string;
    url: string;
  };
  resourceIdObjMeta?: {
    alt?: string;
    title?: string;
    width: number;
    height: number;
  };
}


// Taxonomy Term (Categories) - Extending DrupalTaxonomyTerm
export interface TaxonomyTerm extends DrupalTaxonomyTerm {
  name: string;
}

// Article Content Type - Extending DrupalNode
export interface DrupalArticle extends DrupalNode {
  field_excerpt?: string;
  field_reading_time?: string;
  field_image?: DrupalMedia;
  field_category?: TaxonomyTerm;
  field_tags?: TaxonomyTerm[];
  field_featured?: boolean;
  uid?: {
    display_name?: string;
  };
}

// Podcast Episode Content Type
export interface DrupalPodcastEpisode extends DrupalNode {
  field_description?: string;
  field_duration?: string;
  field_episode_number?: number;
  field_season?: number;
  field_spotify_url?: string;
  field_youtube_url?: string;
  field_image?: DrupalMedia;
  field_category?: TaxonomyTerm;
  field_band_name?: string;
}

// Pagination params
export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// Filter params for articles
export interface ArticleFilterParams extends PaginationParams {
  category?: string;
  search?: string;
  sortBy?: 'created' | 'changed' | 'title';
  sortOrder?: 'ASC' | 'DESC';
  featured?: boolean;
}