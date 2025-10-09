//const slugify = require('slugify');
const crypto = require('crypto');


const SELECT_IMAGE_FIELDS = ['formats', 'url', 'alternativeText', 'width', 'height'];
const SELECT_VIDEO_FIELDS = ['title', 'upload_id', 'asset_id', 'playback_id', 'duration'];
const SELECT_PLACES_FIELDS = ["id", "slug", "name", "description", "address", "type", "lat", "lng", 'tier', 'published_at', 'is_international', 'tagline'];
const PARTNERS = {
  PAYTOUR: 'paytour',
  VENDA_CONSULTIVA: 'venda_consultiva',
  PLANNE: 'planne',
  ADMIN_SALE_PLANNE: 'admin_sale_planne',
};

const PRODUCT_TYPE = {
  SINGLE: 'single',
  COMBO: 'combo',
  COMBO_FLEX: 'combo-flex',
  EVENT: 'event',
  GIFT_CARD: 'gift-card',
  ACCOMMODATION: 'accommodation',
  TRANSPORT: 'transport',
};
const PRODUCT_COMPONENT_TYPE = {
  SINGLE: 'experience-type.single',
  COMBO: 'experience-type.combo',
  COMBO_FLEX: 'experience-type.flex',
  EVENT: 'experience-type.event',
  GIFT_CARD: 'experience-type.gift-card'
};
const LOCATION_TYPE = {
  COUNTRY: 'country',
  REGION: 'region',
  CITY: 'city',
  ROUTE: 'route',
  NEIGHBORHOOD: 'neighborhood',
};
const PROJECT = { WINELOCALS: 'winelocals', VIVAORS: 'vivaors' };

/*const getSlug = (text) => {
  return slugify(text, {
    lower: true,
    remove: /[*+~.()'"!:@?#$%¨&<>.,]/g,
  });
};*/

const markdownToRichtext = (markdownText) => {
  let richtext = markdownText;
  // Replace headings
  richtext = richtext.replace(/^# (.*)$/gm, '<h1>$1</h1>');
  richtext = richtext.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  richtext = richtext.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  richtext = richtext.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
  richtext = richtext.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
  richtext = richtext.replace(/^###### (.*)$/gm, '<h6>$1</h6>');

  // Replace bold and italic text
  richtext = richtext.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  richtext = richtext.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Replace strikethrough text
  richtext = richtext.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Replace underlined text
  richtext = richtext.replace(/<u>(.*?)<\/u>/g, '<span style="text-decoration: underline;">$1</span>');

  // Replace ordered and unordered lists
  richtext = richtext.replace(/^\d\.(.*)$/gm, '<ol><li>$1</li></ol>');
  richtext = richtext.replace(/^-\s(.*)$/gm, '<ul><li>$1</li></ul>');

  // Replace blockquotes
  richtext = richtext.replace(/^>\s(.*)$/gm, '<blockquote>$1</blockquote>');

  // Replace code blocks
  richtext = richtext.replace(/```(.*?)```/gs, '<pre>$1</pre>');

  // Replace inline code
  richtext = richtext.replace(/`(.*?)`/g, '<code>$1</code>');

  // Replace links
  richtext = richtext.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  return richtext;
};
const generateBase64Hash = () => {
  return crypto.randomBytes(16).toString('base64');
};
const removeMarkdown = (markdownText) => {
  let richText = markdownText;
  return richText
    // Remove blocos de código (```...```)
    .replace(/```[\s\S]*?```/g, '')
    // Remove código inline (`...`)
    .replace(/`([^`]*)`/g, '$1')
    // Remove imagens ![alt](url)
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links [texto](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove negrito e itálico Markdown
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Remove títulos Markdown (#, ##, etc.)
    .replace(/^#{1,6}\s*/gm, '')
    // Remove citações Markdown
    .replace(/^\s*>+\s?/gm, '')
    // Remove listas Markdown
    .replace(/^\s*([-*+]|\d+\.)\s+/gm, '')
    // Remove separadores Markdown
    .replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '')
    // Remove tags HTML
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Remove entidades HTML (opcional)
    .replace(/&[a-z]+;/gi, '')
    // Remove múltiplas quebras de linha
    .replace(/\n{2,}/g, '\n')
    // Remove espaços em excesso no começo/fim
    .trim();
};
const showPlaceTaglineByDescription = (entity) => {
  if (entity?.components) {
    entity.components = entity.components.map(component => {
      if (component.__component === 'sections.places-page' || component.__component === 'sections.place-highlights') {
        if (component.places) component.places = processPlaces(component.places);
        if (component?.highlightPlaces?.places && component?.highlightPlaces?.places.length > 0) {
          component.highlightPlaces.places = processPlaces(component.highlightPlaces.places);
        }
        if (component.newPlaces) component.newPlaces = processPlaces(component.newPlaces);
        if (component.placesChoices) component.placesChoices = processPlaces(component.placesChoices);
      }
      return component;
    });
  }
  if (entity?.highlightPlaces?.places && entity?.highlightPlaces?.places.length > 0) {
    entity.highlightPlaces.places = processPlaces(entity.highlightPlaces.places);
  }
  if (entity?.places && entity.places.length > 0) {
    entity.places = processPlaces(entity.places);
  }
  return entity;
};
function processPlaces(places) {
  return places?.map(place => {
    if (!place.tagline && place.description) {
      const descriptionToSplit = removeMarkdown(place.description);
      place.tagline = descriptionToSplit.split(/[.!?;]+/, 1)[0];
    }
    return place;
  });
};

module.exports = {
  /*getSlug,
  markdownToRichtext,
  generateBase64Hash,
  removeMarkdown,
  showPlaceTaglineByDescription,
  processPlaces,*/
  SELECT_IMAGE_FIELDS,
  SELECT_VIDEO_FIELDS,
  SELECT_PLACES_FIELDS,
  PARTNERS,
  PRODUCT_TYPE,
  PRODUCT_COMPONENT_TYPE,
  LOCATION_TYPE,
  PROJECT,
  SELECT_PLACES_FIELDS,
  SELECT_IMAGE_FIELDS,
};
