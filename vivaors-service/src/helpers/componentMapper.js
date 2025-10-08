/**
 * Mapa de componentes antigos → novos
 */
const COMPONENT_MAP = {
  "content.form": "content.widget",
  "content.text": "content.text",
  "content.video-youtube": "media.videos",
  "cta.button": "cta.button",
  "media.gallery": "media.single-image",
  "media.video": "media.videos",
  "media.single-image": "media.single-image",
  "content.widget": "content.widget",
  "sections.banners-page": "section.banners-page",
  "sections.categories-page": "section.categories-pages",
  "sections.highlights-page": "section.highlights-page",
  "sections.locations-page": "section.locations-page",
  "sections.trails": "section.itineraries",
  "sections.place-highlights": "section.highlights",
  "sections.banner-full": "section.banners-page",
  "sections.locations-map": "section.locations-map",
  "sections.page-break": "content.page-break",
  "sections.products-page": "section.experiences",
  "sections.places-page": "section.experiences",
};

/**
 * Função utilitária para mapear os componentes de um Dynamic Zone
 * conforme o COMPONENT_MAP.
 *
 * @param {Array} contents - Array de componentes de uma Dynamic Zone
 * @returns {Array} - Componentes mapeados
 */
function mapDynamicZone(contents = []) {
  if (!Array.isArray(contents)) return [];

  return contents
    .map(component => {
      const componentKey = component.__component;
      const newComponent = COMPONENT_MAP[componentKey];

      if (!newComponent) {
        console.warn(`⚠️ Componente não mapeado e ignorado: ${componentKey}`);
        return null;
      }

      return { ...component, __component: newComponent };
    })
    .filter(Boolean);
}

module.exports = {
  COMPONENT_MAP,
  mapDynamicZone,
};
