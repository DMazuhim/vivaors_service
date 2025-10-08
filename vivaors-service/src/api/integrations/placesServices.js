const experienceIntegration = require('./placesIntegration')

const COMPONENT_MAP = {
    // Componentes de Conteúdo e Mídia
    "content.form": "content.widget",
    "content.text": "content.text",
    "content.video-youtube": "media.videos",
    "cta.button": "cta.button",
    "media.gallery": "media.single-image",
    "media.video": "media.videos",
    "media.single-image": "media.single-image",
    "content.widget": "content.widget",
    
    // Componentes de Seções
    "sections.banners-page": "section.banners-page",
    "sections.categories-page": "section.categories-pages",
    "sections.highlights-page": "section.highlights-page",
    "sections.locations-page": "section.locations-page",
    "sections.trails": "section.itineraries",
    "sections.place-highlights": "section.highlights",
    "sections.banner-full": "section.banners-page",
    "sections.locations-map": "section.locations-map",
    "sections.page-break": "content.page-break",
    
    // Outros mapeamentos
    "sections.products-page": "section.experiences",
    "sections.places-page": "section.experiences",
};

// Função auxiliar LIMPA para remover apenas IDs de relacionamentos (como o ID de 'location')
const cleanRelation = (data) => {
    // Remove apenas objetos que SÓ contêm ID/documentId e não são a imagem complexa.
    // Isso é um palpite para evitar o erro de validação em relações como 'video'
    if (data && typeof data === 'object' && (data.id && !data.url)) {
        return null;
    }
    return data;
};


/* eslint-disable prettier/prettier */
module.exports = {
  async fetchPlaces() {
    const integrationResponse = await experienceIntegration.fetchPlaces()
    const places = Array.isArray(integrationResponse.data) ? integrationResponse.data : []
    
    const experiences = places.map(place => this.parsePlaceToExperience(place))

    await Promise.all(
      experiences.map(async experience => {
        try {
          await strapi.entityService.create('api::experience.experience', {
            data: experience
          })
        } catch (error) {
            let errorMessage = error.message;

            if (error.details && error.details.errors) {
                errorMessage = error.details.errors.map(err => `${err.path.join('.')} ${err.message}`).join('; ');
            }
            
            console.error(`Falha ao criar experiência "${experience.title}": ${errorMessage}`);
        }
      })
    )
  },

  parsePlaceToExperience(place) {
    const parsedComponents = (place?.components || [])
        .map(component => {
            if (component?.__component) {
                const newComponentName = COMPONENT_MAP[component.__component];
                if (newComponentName) {
                    return {
                        ...component,
                        __component: newComponentName
                    };
                }
                return null;
            }
            return component;
        })
        .filter(component => component !== null);
    
    return {
      title: place?.name,
      slug: place?.slug,
      address: place?.address,
      lat: place?.lat,
      lng: place?.lng,
      placeGoogleId: place?.placeGoogleId,
      description: place?.description,
      tier: place?.tier,
      tagline: place?.tagline,
      relevance: place?.relevance,

      seo: place?.seo,

      locations: (place?.locations || []).map(location => location.id), 
      categories: (place?.categories || []).map(category => category.id), 
      tags: (place?.tags || []).map(tag => tag.id),

      // REVERTIDO: Envia o objeto de mídia complexo da origem (pode falhar)
      coverDesktop: place?.coverDesktop, 
      coverMobile: place?.coverMobile, 
      // GALERIA: Envia a galeria como está (array de objetos complexos)
      gallery: place?.gallery,
      
      components: parsedComponents, 

      publishedAt: place?.publishedAt,
    }
  }
};