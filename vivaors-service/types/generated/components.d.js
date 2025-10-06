import type { Schema, Struct } from '@strapi/strapi';

export interface ContentPageBreak extends Struct.ComponentSchema {
  collectionName: 'components_content_page_breaks';
  info: {
    displayName: 'pageBreak';
    icon: 'oneToOne';
  };
  attributes: {
    hexColor: Schema.Attribute.String;
    thickness: Schema.Attribute.Enumeration<['small', 'medium', 'large']> &
      Schema.Attribute.DefaultTo<'medium'>;
  };
}

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

export interface ContentTextExperience extends Struct.ComponentSchema {
  collectionName: 'components_content_text_experiences';
  info: {
    displayName: 'textExperience';
    icon: 'pencil';
  };
  attributes: {
    experience: Schema.Attribute.Relation<
      'oneToOne',
      'api::experience.experience'
    >;
    subtitle: Schema.Attribute.String;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ContentTextGuide extends Struct.ComponentSchema {
  collectionName: 'components_content_text_guides';
  info: {
    displayName: 'textGuide';
    icon: 'pencil';
  };
  attributes: {
    guide: Schema.Attribute.Relation<'oneToOne', 'api::guide.guide'>;
    subtitle: Schema.Attribute.String;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ContentTextItinerary extends Struct.ComponentSchema {
  collectionName: 'components_content_text_itineraries';
  info: {
    displayName: 'textItinerary';
    icon: 'pencil';
  };
  attributes: {
    itinerary: Schema.Attribute.Relation<
      'oneToOne',
      'api::itinerary.itinerary'
    >;
    subtitle: Schema.Attribute.String;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ContentTextLocation extends Struct.ComponentSchema {
  collectionName: 'components_content_text_locations';
  info: {
    displayName: 'textLocation';
    icon: 'pencil';
  };
  attributes: {
    location: Schema.Attribute.Relation<'oneToOne', 'api::location.location'>;
    subtitle: Schema.Attribute.String;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ContentWidget extends Struct.ComponentSchema {
  collectionName: 'components_content_widgets';
  info: {
    displayName: 'widget';
    icon: 'grid';
  };
  attributes: {
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['form', 'widget']>;
    value: Schema.Attribute.Text;
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
    subtitle: Schema.Attribute.String;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'copy';
        };
      }>;
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
    imageDirection: Schema.Attribute.Enumeration<['horizontal', 'vertical']>;
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
    subtitle: Schema.Attribute.String;
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
  };
}

export interface MediaVideos extends Struct.ComponentSchema {
  collectionName: 'components_media_videos';
  info: {
    displayName: 'videos';
    icon: 'play';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    videos: Schema.Attribute.Relation<'oneToMany', 'api::video.video'>;
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

export interface SectionBannersPage extends Struct.ComponentSchema {
  collectionName: 'components_sections_banners_pages';
  info: {
    description: '';
    displayName: 'Se\u00E7\u00E3o de banners';
  };
  attributes: {
    redirectUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['promoBanner', 'heroBanner']>;
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
    isCarrousel: Schema.Attribute.Boolean;
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
    sectionTrails: Schema.Attribute.Component<'section.itineraries', true>;
  };
}

export interface SectionExperiences extends Struct.ComponentSchema {
  collectionName: 'components_section_experiences';
  info: {
    displayName: 'experiences';
    icon: 'gate';
  };
  attributes: {
    experiences: Schema.Attribute.Relation<
      'oneToMany',
      'api::experience.experience'
    >;
    isCarrousel: Schema.Attribute.Boolean;
    redirectUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
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

export interface SectionHighlightsPage extends Struct.ComponentSchema {
  collectionName: 'components_sections_highlights_pages';
  info: {
    description: '';
    displayName: 'Destaques de p\u00E1gina';
  };
  attributes: {
    highlights: Schema.Attribute.Component<'section.highlights', true>;
    redirectUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
  };
}

export interface SectionItineraries extends Struct.ComponentSchema {
  collectionName: 'components_sections_trails';
  info: {
    description: '';
    displayName: 'Roteiros&Listas';
    icon: 'tasks';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    itineraries: Schema.Attribute.Relation<
      'oneToMany',
      'api::itinerary.itinerary'
    > &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    redirectUrl: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
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
  };
}

export interface SectionLocationsPage extends Struct.ComponentSchema {
  collectionName: 'components_sections_locations_pages';
  info: {
    description: '';
    displayName: 'Se\u00E7\u00E3o cidades, rotas e regi\u00F5es';
  };
  attributes: {
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
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.page-break': ContentPageBreak;
      'content.text': ContentText;
      'content.text-experience': ContentTextExperience;
      'content.text-guide': ContentTextGuide;
      'content.text-itinerary': ContentTextItinerary;
      'content.text-location': ContentTextLocation;
      'content.widget': ContentWidget;
      'cta.button': CtaButton;
      'media.popup': MediaPopup;
      'media.single-image': MediaSingleImage;
      'media.videos': MediaVideos;
      'meta.seo': MetaSeo;
      'section.banners-page': SectionBannersPage;
      'section.categories-pages': SectionCategoriesPages;
      'section.components': SectionComponents;
      'section.experiences': SectionExperiences;
      'section.highlights': SectionHighlights;
      'section.highlights-page': SectionHighlightsPage;
      'section.itineraries': SectionItineraries;
      'section.locations-map': SectionLocationsMap;
      'section.locations-page': SectionLocationsPage;
    }
  }
}
