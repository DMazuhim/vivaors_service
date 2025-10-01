import type { Schema, Struct } from '@strapi/strapi';

export interface ContentText extends Struct.ComponentSchema {
  collectionName: 'components_content_texts';
  info: {
    description: '';
    displayName: 'text';
    icon: 'file-alt';
  };
  attributes: {
    position: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
  };
}

export interface ContentWidget extends Struct.ComponentSchema {
  collectionName: 'components_content_widgets';
  info: {
    displayName: 'widget';
    icon: 'grid';
  };
  attributes: {
    script: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']>;
    type: Schema.Attribute.Enumeration<['captor-de-leads']>;
  };
}

export interface CtaButton extends Struct.ComponentSchema {
  collectionName: 'components_cta_buttons';
  info: {
    description: '';
    displayName: 'Bot\u00E3o';
    icon: 'toggle-on';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    position: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
  };
}

export interface LeadForm extends Struct.ComponentSchema {
  collectionName: 'components_lead_forms';
  info: {
    displayName: 'form';
    icon: 'bulletList';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MediaBannerCampaign extends Struct.ComponentSchema {
  collectionName: 'components_media_banner_campaigns';
  info: {
    description: '';
    displayName: 'bannerCampaign';
    icon: 'film';
  };
  attributes: {
    coverDesktop: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    coverMobile: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    url: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
  };
}

export interface MediaBannerMarketing extends Struct.ComponentSchema {
  collectionName: 'components_media_banner_marketings';
  info: {
    displayName: 'bannerMarketing';
  };
  attributes: {
    coverDesktop: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    coverMobile: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    url: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
  };
}

export interface MediaGallery extends Struct.ComponentSchema {
  collectionName: 'components_media_galleries';
  info: {
    description: '';
    displayName: 'Galeria';
    icon: 'images';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    buttonPosition: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    buttonUrl: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    images: Schema.Attribute.Media<'images', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    position: Schema.Attribute.Enumeration<['left', 'center', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'center'>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface MediaPopup extends Struct.ComponentSchema {
  collectionName: 'components_media_popups';
  info: {
    displayName: 'popup';
    icon: 'landscape';
  };
  attributes: {
    duration: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MediaSingleImage extends Struct.ComponentSchema {
  collectionName: 'components_media_single_images';
  info: {
    description: '';
    displayName: 'Imagem';
    icon: 'image';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    buttonPosition: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    buttonUrl: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    image: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    imageDirection: Schema.Attribute.Enumeration<['horizontal', 'vertical']>;
    position: Schema.Attribute.Enumeration<['left', 'center', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'center'>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface MetaSeo extends Struct.ComponentSchema {
  collectionName: 'components_meta_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    keywords: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SectionBannerFull extends Struct.ComponentSchema {
  collectionName: 'components_sections_banner_full';
  info: {
    description: '';
    displayName: 'Mega Banner';
    icon: 'cube';
  };
  attributes: {
    coverDesktop: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    coverMobile: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface SectionBannersPage extends Struct.ComponentSchema {
  collectionName: 'components_sections_banners_pages';
  info: {
    description: '';
    displayName: 'Se\u00E7\u00E3o de banners';
  };
  attributes: {
    banners: Schema.Attribute.Component<'media.banner-marketing', true>;
    location: Schema.Attribute.Relation<'oneToOne', 'api::location.location'>;
    redirectUrl: Schema.Attribute.String;
  };
}

export interface SectionCategoriesPages extends Struct.ComponentSchema {
  collectionName: 'components_sections_categories_pages';
  info: {
    description: '';
    displayName: 'Se\u00E7\u00E3o de categories';
    icon: 'cube';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    > &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    redirectUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface SectionComponents extends Struct.ComponentSchema {
  collectionName: 'components_section_components';
  info: {
    displayName: 'components';
    icon: 'apps';
  };
  attributes: {
    categories: Schema.Attribute.Component<'section.categories-pages', true>;
    pageBreak: Schema.Attribute.Component<'section.page-break', true>;
    placesPage: Schema.Attribute.Component<'section.places-page', true>;
    sectionTrails: Schema.Attribute.Component<'section.trails', true>;
  };
}

export interface SectionHighlights extends Struct.ComponentSchema {
  collectionName: 'components_sections_highlights';
  info: {
    description: '';
    displayName: 'highlights';
  };
  attributes: {
    coverDesktop: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    coverMobile: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    url: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
  };
}

export interface SectionHighlightsGuideV2 extends Struct.ComponentSchema {
  collectionName: 'components_sections_highlights_guides';
  info: {
    displayName: 'highlightGuides';
    icon: 'dashboard';
  };
  attributes: {
    highlights: Schema.Attribute.Component<'section.highlights', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
  };
}

export interface SectionHighlightsPage extends Struct.ComponentSchema {
  collectionName: 'components_sections_highlights_pages';
  info: {
    description: '';
    displayName: 'Destaques de p\u00E1gina';
  };
  attributes: {
    highlights: Schema.Attribute.Component<'section.highlights', true>;
    location: Schema.Attribute.Relation<'oneToOne', 'api::location.location'>;
    redirectUrl: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface SectionLocationsMap extends Struct.ComponentSchema {
  collectionName: 'components_sections_locations_maps';
  info: {
    description: '';
    displayName: 'Mapa de Cidade, Rota e Regi\u00E3o';
    icon: 'earth';
  };
  attributes: {
    location: Schema.Attribute.Relation<'oneToOne', 'api::location.location'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    locations: Schema.Attribute.Relation<
      'oneToMany',
      'api::location.location'
    > &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface SectionLocationsPage extends Struct.ComponentSchema {
  collectionName: 'components_sections_locations_pages';
  info: {
    description: '';
    displayName: 'Se\u00E7\u00E3o cidades, rotas e regi\u00F5es';
  };
  attributes: {
    location: Schema.Attribute.Relation<'oneToOne', 'api::location.location'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    locations: Schema.Attribute.Relation<
      'oneToMany',
      'api::location.location'
    > &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    redirectUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface SectionPageBreak extends Struct.ComponentSchema {
  collectionName: 'components_sections_page_breaks';
  info: {
    description: '';
    displayName: 'pageBreak';
    icon: 'server';
  };
  attributes: {
    hexColor: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
  };
}

export interface SectionPlacesPage extends Struct.ComponentSchema {
  collectionName: 'components_sections_places_pages';
  info: {
    description: '';
    displayName: 'placesPage';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    places: Schema.Attribute.Relation<
      'oneToMany',
      'api::experience.experience'
    > &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    redirectUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'pequeno'>;
  };
}

export interface SectionTrails extends Struct.ComponentSchema {
  collectionName: 'components_sections_trails';
  info: {
    description: '';
    displayName: 'Roteiros&Listas';
    icon: 'tasks';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    isCarousel: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    redirectUrl: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    titleSize: Schema.Attribute.Enumeration<['grande', 'medio', 'pequeno']> &
      Schema.Attribute.DefaultTo<'medio'>;
    trails: Schema.Attribute.Relation<'oneToMany', 'api::trail.trail'> &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.text': ContentText;
      'content.widget': ContentWidget;
      'cta.button': CtaButton;
      'lead.form': LeadForm;
      'media.banner-campaign': MediaBannerCampaign;
      'media.banner-marketing': MediaBannerMarketing;
      'media.gallery': MediaGallery;
      'media.popup': MediaPopup;
      'media.single-image': MediaSingleImage;
      'meta.seo': MetaSeo;
      'section.banner-full': SectionBannerFull;
      'section.banners-page': SectionBannersPage;
      'section.categories-pages': SectionCategoriesPages;
      'section.components': SectionComponents;
      'section.highlights': SectionHighlights;
      'section.highlights-guide-v2': SectionHighlightsGuideV2;
      'section.highlights-page': SectionHighlightsPage;
      'section.locations-map': SectionLocationsMap;
      'section.locations-page': SectionLocationsPage;
      'section.page-break': SectionPageBreak;
      'section.places-page': SectionPlacesPage;
      'section.trails': SectionTrails;
    }
  }
}
