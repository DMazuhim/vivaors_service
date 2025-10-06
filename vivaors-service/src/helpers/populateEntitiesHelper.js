const SELECT_IMAGE_FIELDS = ['formats', 'url', 'alternativeText', 'width', 'height'];
const SELECT_VIDEO_FIELDS = ['title', 'upload_id', 'asset_id', 'playback_id', 'duration'];
const SELECT_VIDEO_ASSET_FIELDS = ['id', 'title', 'video_id', 'thumbUrl', 'description', 'type', 'provider'];
const SELECT_PLACES_LIST_FIELDS = ['slug', 'name', 'type', 'tier', 'published_at', 'is_international', 'tagline', 'lat', 'lng', 'description'];
const SELECT_LOCATIONS = ['id', 'type', 'name', 'slug', 'lat', 'lng', 'tagline', 'isContent'];
const SELECT_MOODS_FIELDS = ['title', 'color'];
const SELECT_MAIN_CATEGORY_FIELDS = ['name', 'tagline', 'color'];
const SELECT_TAGS_FIELDS = ['name', 'slug', 'color'];
const SELECT_TRAILS_FIELDS = ['title', 'slug', 'resume', 'description', 'isActive', 'type', 'readingTime', 'publishedAt', 'newModel', 'editorsSignature'];
const SELECT_GUIDES_FIELDS = ['title', 'slug', 'id'];
const SELECT_CATEGORIES_FIELDS = ['title', 'slug'];
const SELECT_PRODUCT_FIELDS = ['id', 'title', 'slug', 'price', 'productType', 'daysWeek', 'numberOfPeople', 'showPlace', 'nextDate', 'productStatus', 'smallTitle'];
const SELECT_PRODUCT_FIELDS_LIST = ['title', 'slug', 'price', 'productType', 'daysWeek', 'numberOfPeople', 'address', 'isExclusive', 'isNovelty', 'opening', 'closeAt', 'useBanner', 'nextDate', 'productStatus', 'smallTitle'];
const SELECT_FORM_FIELDS = ['title', 'formUrl'];
const SELECT_PARTNERPLATFORM_FIELDS = ['name', 'integrationType', 'platform'];
const SELECT_PRODUCT_TYPE_PARTNERPLATFORM_FIELDS = { select: ['platform'] };
const SELECT_TOUR_FIELDS = ['title', 'partnerTourId', 'id', 'enableSupportRedirect'];
const SELECT_CLIENT_FIELDS = ['name', 'cnpj', 'address', 'slug'];
const SELECT_YOUTUBE_FIELDS = ['videoId', 'title'];
const SELECT_POPUP_FIELDS = ['title', 'text', 'startTime', 'duration', 'isGeneral', 'slug', 'imageTextColor'];
const SELECT_AND_POPULATE_FULL_LOCATIONS = { country: { select: SELECT_LOCATIONS }, city: { select: SELECT_LOCATIONS }, region: { select: SELECT_LOCATIONS }, route: { select: SELECT_LOCATIONS }, neighborhoods: { select: SELECT_LOCATIONS } };
const SELECT_AND_POPULATE_FULL_LOCATIONS_AND_GUIDES = { country: { select: SELECT_LOCATIONS, populate: { guideV2: true } }, city: { select: SELECT_LOCATIONS, populate: { guideV2: true } }, region: { select: SELECT_LOCATIONS, populate: { guideV2: true } }, route: { select: SELECT_LOCATIONS, populate: { guideV2: true } }, neighborhoods: { select: SELECT_LOCATIONS, populate: { guideV2: true } } };

const POPULATE_AND_FIELDS_COVERS = { coverDesktop: { select: SELECT_IMAGE_FIELDS }, coverMobile: { select: SELECT_IMAGE_FIELDS } };
const POPULATE_AND_FIELDS_COVER_VIDEO = { coverVideo: { populate: { video: { select: SELECT_VIDEO_FIELDS }, thumb: { select: SELECT_IMAGE_FIELDS } } } };
const POPULATE_AND_FIELDS_TAGS = { select: SELECT_TAGS_FIELDS, populate: { icon: { select: SELECT_IMAGE_FIELDS } } };

const POPULATE_AND_FIELDS_PRODUCT_TYPE_EXPERIENCE = { select: SELECT_TOUR_FIELDS, populate: { partnerPlatform: SELECT_PRODUCT_TYPE_PARTNERPLATFORM_FIELDS, tags: POPULATE_AND_FIELDS_TAGS } };
const POPULATE_AND_FIELDS_PRODUCT_TYPE_EVENT = { select: ['initialDate', 'finalDate'], populate: { tour: POPULATE_AND_FIELDS_PRODUCT_TYPE_EXPERIENCE, dates: { select: ['date'] } } };
const POPULATE_AND_FIELDS_PRODUCT_TYPE_COMBO_FLEX = POPULATE_AND_FIELDS_PRODUCT_TYPE_EXPERIENCE;
const POPULATE_AND_FIELDS_PRODUCT_TYPE_COMBO = { populate: { tour: POPULATE_AND_FIELDS_PRODUCT_TYPE_EXPERIENCE } };
const POPULATE_AND_FIELDS_PRODUCT_TYPE_GIFT = POPULATE_AND_FIELDS_PRODUCT_TYPE_EXPERIENCE;

const POPULATE_AND_FIELDS_PRODUCT_TYPES_SHORTCUTS = {
  populate: {
    tour: { select: SELECT_TOUR_FIELDS, populate: { partnerPlatform: SELECT_PRODUCT_TYPE_PARTNERPLATFORM_FIELDS } },
    tours: { select: SELECT_TOUR_FIELDS, populate: { partnerPlatform: SELECT_PRODUCT_TYPE_PARTNERPLATFORM_FIELDS } },
    event: { select: ['initialDate', 'finalDate'], populate: { tour: { select: SELECT_TOUR_FIELDS, populate: { partnerPlatform: SELECT_PRODUCT_TYPE_PARTNERPLATFORM_FIELDS } }, } },
    single: { populate: { tour: { select: SELECT_TOUR_FIELDS, populate: { partnerPlatform: SELECT_PRODUCT_TYPE_PARTNERPLATFORM_FIELDS } } } },
    giftcard: { select: SELECT_TOUR_FIELDS, populate: { partnerPlatform: SELECT_PRODUCT_TYPE_PARTNERPLATFORM_FIELDS } },
    dates: { select: ['date'] }
  }
};

const POPULATE_AND_FIELDS_CLIENTS_RELATIONSHIP = { select: SELECT_CLIENT_FIELDS, populate: { logo: { select: SELECT_IMAGE_FIELDS } } };
const POPULATE_AND_FIELDS_MOODS_ICON = { select: SELECT_MOODS_FIELDS, populate: { icon: { select: SELECT_IMAGE_FIELDS } } };
const POPULATE_AND_FIELDS_MOODS_CARDS = { select: SELECT_MOODS_FIELDS, populate: POPULATE_AND_FIELDS_COVERS };

const POPULATE_AND_FIELDS_BANNERMARKETING = { select: ["url"], populate: { POPULATE_AND_FIELDS_COVERS } };

const POPULATE_AND_FIELDS_EDITOR = {
  select: ['name', 'bio'],
  populate: { avatar: { select: SELECT_IMAGE_FIELDS }, social: true }
};

const POPULATE_AND_SELECT_LOCATIONS_CARDS_MAIN_CATEGORY = {
  select: SELECT_LOCATIONS,
  populate: { ...POPULATE_AND_FIELDS_COVERS, mainCategories: { select: SELECT_MAIN_CATEGORY_FIELDS } },
};
const POPULATE_AND_SELECT_LOCATIONS_CARDS = { select: SELECT_LOCATIONS, populate: POPULATE_AND_FIELDS_COVERS };

const POPULATE_AND_FIELDS_POPUP = {
  select: SELECT_POPUP_FIELDS,
  populate: {
    button: true,
    image: {
      select: SELECT_IMAGE_FIELDS
    }
  }
};
const POPULATE_AND_SELECT_CATEGORIES = {
  select: SELECT_CATEGORIES_FIELDS,
  populate: {
    ...POPULATE_AND_FIELDS_COVERS,
    categoryType: { select: ['name', 'value', 'slug', 'description', 'label'] },
  }
};
const POPULATE_AND_SELECT_PRODUCTS_CARDS = {
  select: SELECT_PRODUCT_FIELDS,
  populate: {
    type: { populate: { event: { select: ['initialDate', 'finalDate'] }, dates: { select: ['date'] } } },
    places: { select: ['name'], populate: SELECT_AND_POPULATE_FULL_LOCATIONS },
    discount: true,
    ...POPULATE_AND_FIELDS_COVERS,
    gallery: { select: SELECT_IMAGE_FIELDS },
    partnerPlatform: { select: ['name', 'platform'] }
  },
};
const POPULATE_AND_FIELDS_TRAILS_CARDS = {
  select: SELECT_TRAILS_FIELDS,
  populate: {
    ...POPULATE_AND_FIELDS_COVERS,
    coverCard: {
      select: SELECT_IMAGE_FIELDS,
    },
    videos: {
      select: SELECT_VIDEO_FIELDS,
    },
    gallery: {
      select: SELECT_IMAGE_FIELDS,
    },
    guides: {
      select: SELECT_GUIDES_FIELDS,
    },
    mainCategory: {
      select: SELECT_MAIN_CATEGORY_FIELDS,
    }
  },
};
const POPULATE_AND_FIELDS_PLACES_CARDS = {
  select: SELECT_PLACES_LIST_FIELDS,
  populate: {
    ...POPULATE_AND_FIELDS_COVERS,
    ...SELECT_AND_POPULATE_FULL_LOCATIONS,
    mainCategory: { select: SELECT_MAIN_CATEGORY_FIELDS },
    moods: POPULATE_AND_FIELDS_MOODS_ICON,
    client: { select: SELECT_CLIENT_FIELDS },
    products: { select: SELECT_PRODUCT_FIELDS, },
    gallery: { select: SELECT_IMAGE_FIELDS }
  },
};
const POPULATE_AND_FIELDS_PLACES_LOCATIONS_RELATIONSHIP = {
  select: SELECT_PLACES_LIST_FIELDS,
  populate: {
    ...POPULATE_AND_FIELDS_COVERS,
    ...SELECT_AND_POPULATE_FULL_LOCATIONS,
  },
};
const POPULATE_AND_FIELDS_COMPONENTS = {
  populate: {
    image: { select: SELECT_IMAGE_FIELDS, populate: { mainCategory: { select: SELECT_MAIN_CATEGORY_FIELDS } } },
    trails: { ...POPULATE_AND_FIELDS_TRAILS_CARDS },
    images: { select: SELECT_IMAGE_FIELDS, populate: { mainCategory: { select: SELECT_MAIN_CATEGORY_FIELDS } } },
    thumb: { select: SELECT_IMAGE_FIELDS },
    video: { select: SELECT_VIDEO_FIELDS },
    categories: POPULATE_AND_SELECT_CATEGORIES,
    mainCategory: { select: SELECT_MAIN_CATEGORY_FIELDS },
    location: { select: SELECT_LOCATIONS },
    locations: {
      select: SELECT_LOCATIONS,
      populate: {
        ...POPULATE_AND_FIELDS_COVERS,
        macroRegion: {
          select: ['name', 'slug'],
          populate: {
            locations: SELECT_LOCATIONS,
          }
        }
      }

    },
    places: POPULATE_AND_FIELDS_PLACES_CARDS,
    products: POPULATE_AND_SELECT_PRODUCTS_CARDS,
    posts: { select: SELECT_TRAILS_FIELDS, populate: POPULATE_AND_FIELDS_COVERS },
    highlight: { populate: POPULATE_AND_FIELDS_COVERS },
    banners: { populate: { ...POPULATE_AND_FIELDS_COVERS, mainCategory: { select: SELECT_MAIN_CATEGORY_FIELDS } } },
    guides: {
      select: SELECT_GUIDES_FIELDS,
      populate: { ...POPULATE_AND_FIELDS_COVERS, mainCategory: { select: SELECT_MAIN_CATEGORY_FIELDS } },
    },
    guidesV2: {
      select: SELECT_GUIDES_FIELDS,
      populate: {
        ...POPULATE_AND_FIELDS_COVERS,
        coverCardMobile: {
          select: SELECT_IMAGE_FIELDS,
        },
        coverCardDesktop: {
          select: SELECT_IMAGE_FIELDS,
        },
      },
    },
    highlightPlaces: POPULATE_AND_FIELDS_PLACES_CARDS,
    newPlaces: POPULATE_AND_FIELDS_PLACES_CARDS,
    placesChoices: POPULATE_AND_FIELDS_PLACES_CARDS,
    highlightProducts: POPULATE_AND_SELECT_PRODUCTS_CARDS,
    newProducts: POPULATE_AND_SELECT_PRODUCTS_CARDS,
    productsChoices: POPULATE_AND_SELECT_PRODUCTS_CARDS,
    moods: {
      select: SELECT_MOODS_FIELDS,
      populate: {
        ...POPULATE_AND_FIELDS_COVERS,
        searchBannerMobile: {
          select: SELECT_IMAGE_FIELDS
        },
        searchBannerDesktop: {
          select: SELECT_IMAGE_FIELDS
        }
      }
    },
    youtube: { select: ['videoId', 'title'] },
    linkedVideo: { select: SELECT_VIDEO_ASSET_FIELDS },
    widget: true,
    ...POPULATE_AND_FIELDS_COVERS,
  },
};
const POPULATE_AND_FIELDS_TRAILS = {
  populate: {
    ...POPULATE_AND_FIELDS_COVERS,
    ...POPULATE_AND_FIELDS_COVER_VIDEO,
    coverCard: { select: SELECT_IMAGE_FIELDS },
    infos: { populate: { icon: { select: SELECT_IMAGE_FIELDS } } },
    bannerMarketing: POPULATE_AND_FIELDS_BANNERMARKETING,
    gallery: { select: SELECT_IMAGE_FIELDS },
    videos: { select: SELECT_VIDEO_FIELDS },
    contents: POPULATE_AND_FIELDS_COMPONENTS,
    guides: { select: SELECT_GUIDES_FIELDS },
    tags: { select: SELECT_TAGS_FIELDS },
    form: { select: SELECT_FORM_FIELDS },
    moods: { select: SELECT_MOODS_FIELDS },
    places: POPULATE_AND_FIELDS_PLACES_LOCATIONS_RELATIONSHIP,
    seo: true,
    popupEntity: POPULATE_AND_FIELDS_POPUP,
    editor: POPULATE_AND_FIELDS_EDITOR,
    categories: POPULATE_AND_SELECT_CATEGORIES,

  },
  select: SELECT_TRAILS_FIELDS
};
const POPULATE_AND_FIELDS_PRODUCTS = {
  populate: {
    ...POPULATE_AND_FIELDS_COVERS,
    videoGallery: { select: SELECT_VIDEO_FIELDS },
    videosAssets: { select: SELECT_VIDEO_ASSET_FIELDS },
    tags: POPULATE_AND_FIELDS_TAGS,
    partnerPlatform: { select: SELECT_PARTNERPLATFORM_FIELDS },
    gallery: { select: SELECT_IMAGE_FIELDS },
    places: POPULATE_AND_FIELDS_PLACES_CARDS,
    type: {
      populate: {
        tour: POPULATE_AND_FIELDS_PRODUCT_TYPE_EXPERIENCE,
        tours: POPULATE_AND_FIELDS_PRODUCT_TYPE_COMBO_FLEX,
        event: POPULATE_AND_FIELDS_PRODUCT_TYPE_EVENT,
        single: POPULATE_AND_FIELDS_PRODUCT_TYPE_COMBO,
        giftcard: POPULATE_AND_FIELDS_PRODUCT_TYPE_GIFT,
        dates: { select: ['date'] }
      }
    },
    client: POPULATE_AND_FIELDS_CLIENTS_RELATIONSHIP,
    categories: POPULATE_AND_SELECT_CATEGORIES,
    discount: true,
    daysWeek: true,
    seo: true,
    popupEntity: POPULATE_AND_FIELDS_POPUP
  },
  select: ['title', 'slug', 'address', 'description', 'duration', 'included', 'notIncluded', 'tips', 'cancelPolicy', 'isActive', 'isExclusive', 'isNovelty',
    'price', 'numberOfPeople', 'showPlace', 'daysWeek', 'opening', 'closeAt', 'productType', 'useBanner', 'showTicketsAvailable', 'getHotelAddress', 'nextDate', 'productStatus', 'smallTitle', 'calendarType']
};
const POPULATE_AND_FIELDS_PRODUCTS_SHORTCUTS = {
  select: ['title', 'smallTitle', 'slug', 'cancelPolicy', 'price', 'numberOfPeople', 'showPlace', 'productType', 'showTicketsAvailable', 'nextDate', 'calendarType', 'getHotelAddress'],
  populate: {
    ...POPULATE_AND_FIELDS_COVERS,
    type: POPULATE_AND_FIELDS_PRODUCT_TYPES_SHORTCUTS,
    places: {
      select: ['name'],
      populate: { country: { select: ['name'] }, city: { select: ['name'] }, region: { select: ['name'] }, route: { select: ['name'] }, neighborhoods: { select: ['name'] } },
    },
  }
};
const POPULATE_AND_FIELDS_GUIDE_V2 = {
  ...POPULATE_AND_FIELDS_COVERS,
  map: {
    populate: {
      locations: { select: SELECT_LOCATIONS, populate: POPULATE_AND_FIELDS_COVERS },
      location: { select: SELECT_LOCATIONS, populate: POPULATE_AND_FIELDS_COVERS }
    }
  },
  places: POPULATE_AND_FIELDS_PLACES_CARDS,
  location: { select: SELECT_LOCATIONS },
  coverCardMobile: { select: SELECT_IMAGE_FIELDS },
  coverCardDesktop: { select: SELECT_IMAGE_FIELDS },
  components: POPULATE_AND_FIELDS_COMPONENTS,
  products: POPULATE_AND_SELECT_PRODUCTS_CARDS,
  trails: POPULATE_AND_FIELDS_TRAILS_CARDS,
  youtube: { select: SELECT_YOUTUBE_FIELDS },
  redirects: {
    select: ['title'],
    populate: { redirect: { select: ['url', 'title'], populate: POPULATE_AND_FIELDS_COVERS } }
  },
  pdfGuide: { select: ['title'], populate: { guide: { populate: POPULATE_AND_FIELDS_COVERS } } },
  highlightsGuideV2: {
    select: ['title'],
    populate: { highlight: { select: ['title', 'url'], populate: POPULATE_AND_FIELDS_COVERS } }
  },
  locationsGuide: { populate: { locations: POPULATE_AND_SELECT_LOCATIONS_CARDS } },
  highlightPlaces: { populate: { places: POPULATE_AND_FIELDS_PLACES_CARDS } },
  highlightProducts: { populate: { products: POPULATE_AND_SELECT_PRODUCTS_CARDS } },
  sectionMoods: { populate: { moods: POPULATE_AND_FIELDS_MOODS_CARDS } },
  videoCover: true,
  videoAssetCover: { select: SELECT_VIDEO_ASSET_FIELDS },
  videoAssets: { select: SELECT_VIDEO_ASSET_FIELDS },
  seo: true,
};
const POPULATE_FOR_RELATED_PRODUCTS = {
  select: ['id'],
  populate: {
    places: {
      select: ['id', 'slug', 'name'],
      populate: { country: { select: ['id', 'name'] }, city: { select: ['id', 'name'] }, region: { select: ['id', 'name'] }, route: { select: ['id', 'name'] }, neighborhoods: { select: ['id', 'name'] } },
    },
    categories: { select: ['id'], populate: { type: { select: ['id'] } } }
  }
};

module.exports = {
  SELECT_IMAGE_FIELDS,
  SELECT_VIDEO_FIELDS,
  SELECT_PLACES_LIST_FIELDS,
  SELECT_LOCATIONS,
  SELECT_MOODS_FIELDS,
  SELECT_MAIN_CATEGORY_FIELDS,
  SELECT_TAGS_FIELDS,
  SELECT_TRAILS_FIELDS,
  SELECT_GUIDES_FIELDS,
  SELECT_POPUP_FIELDS,
  POPULATE_AND_FIELDS_TRAILS_CARDS,
  POPULATE_AND_FIELDS_PLACES_CARDS,
  POPULATE_AND_FIELDS_COVERS,
  POPULATE_AND_SELECT_CATEGORIES,
  SELECT_AND_POPULATE_FULL_LOCATIONS,
  SELECT_PRODUCT_FIELDS,
  SELECT_CATEGORIES_FIELDS,
  POPULATE_AND_FIELDS_COMPONENTS,
  POPULATE_AND_SELECT_PRODUCTS_CARDS,
  POPULATE_AND_SELECT_LOCATIONS_CARDS_MAIN_CATEGORY,
  POPULATE_AND_FIELDS_PLACES_LOCATIONS_RELATIONSHIP,
  POPULATE_AND_FIELDS_TRAILS,
  POPULATE_AND_FIELDS_PRODUCTS,
  POPULATE_AND_FIELDS_CLIENTS_RELATIONSHIP,
  SELECT_PRODUCT_FIELDS_LIST,
  POPULATE_AND_FIELDS_BANNERMARKETING,
  POPULATE_AND_FIELDS_MOODS_CARDS,
  POPULATE_AND_FIELDS_GUIDE_V2,
  POPULATE_AND_FIELDS_POPUP,
  SELECT_AND_POPULATE_FULL_LOCATIONS_AND_GUIDES,
  SELECT_VIDEO_ASSET_FIELDS,
  POPULATE_AND_FIELDS_PRODUCTS_SHORTCUTS,
  POPULATE_FOR_RELATED_PRODUCTS
};
