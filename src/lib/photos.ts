const FIVE_HUNDRED_PX_USERNAME = "silentsoar";
const FIVE_HUNDRED_PX_PROFILE_URL = `https://500px.com/p/${FIVE_HUNDRED_PX_USERNAME}`;
const FIVE_HUNDRED_PX_API_BASE = "https://api.500px.com";
const REVALIDATE_SECONDS = 60 * 60 * 12;

interface FiveHundredPxUserResponse {
  user: {
    id: number;
    username: string;
    fullname?: string | null;
    about?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    photos_count?: number | null;
    followers_count?: number | null;
    affection?: number | null;
    cover_url?: string | null;
    avatars?: {
      default?: {
        https?: string | null;
      } | null;
    } | null;
  };
}

interface FiveHundredPxPhotoImage {
  size?: number | null;
  url?: string | null;
  https_url?: string | null;
}

interface FiveHundredPxPhoto {
  id: number;
  name?: string | null;
  description?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  category?: number | null;
  rating?: number | null;
  highest_rating?: number | null;
  votes_count?: number | null;
  times_viewed?: number | null;
  taken_at?: string | null;
  created_at?: string | null;
  camera?: string | null;
  lens?: string | null;
  aperture?: string | null;
  shutter_speed?: string | null;
  focal_length?: string | null;
  iso?: string | null;
  location?: string | null;
  images?: FiveHundredPxPhotoImage[] | null;
}

interface FiveHundredPxPhotosResponse {
  current_page?: number | null;
  total_pages?: number | null;
  total_items?: number | null;
  photos?: FiveHundredPxPhoto[] | null;
}

export interface PhotoPortfolioProfile {
  id: number;
  username: string;
  name: string;
  bio?: string;
  location?: string;
  photoCount?: number;
  followerCount?: number;
  affection?: number;
  coverUrl?: string;
  avatarUrl?: string;
  profileUrl: string;
}

export interface PhotoPortfolioPhoto {
  id: number;
  title: string;
  description?: string;
  href: string;
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  takenAt?: string;
  createdAt?: string;
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  focalLength?: string;
  iso?: string;
  location?: string;
  rating?: number;
  votes?: number;
  views?: number;
}

export interface PhotoPortfolio {
  profile?: PhotoPortfolioProfile;
  photos: PhotoPortfolioPhoto[];
  sourceUrl: string;
  error?: string;
}

function cleanText(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function cleanNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function normalizeImageUrl(value?: string | null) {
  if (!value) {
    return undefined;
  }

  return value.startsWith("//") ? `https:${value}` : value;
}

function imageForSize(photo: FiveHundredPxPhoto, size: number) {
  const image = photo.images?.find((candidate) => candidate.size === size);
  return normalizeImageUrl(image?.https_url ?? image?.url);
}

function firstImage(photo: FiveHundredPxPhoto) {
  const image = photo.images?.find((candidate) => candidate.https_url || candidate.url);
  return normalizeImageUrl(image?.https_url ?? image?.url);
}

async function fetch500pxJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Sandwich Codes photo portfolio (+https://sandwich.codes)",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`500px request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function get500pxProfile(): Promise<PhotoPortfolioProfile> {
  const params = new URLSearchParams({ username: FIVE_HUNDRED_PX_USERNAME });
  const data = await fetch500pxJson<FiveHundredPxUserResponse>(
    `${FIVE_HUNDRED_PX_API_BASE}/v1/users/show?${params.toString()}`,
  );

  const { user } = data;
  const location = [cleanText(user.city), cleanText(user.state), cleanText(user.country)]
    .filter(Boolean)
    .join(", ");

  return {
    id: user.id,
    username: user.username,
    name: cleanText(user.fullname) ?? user.username,
    bio: cleanText(user.about),
    location: location || undefined,
    photoCount: cleanNumber(user.photos_count),
    followerCount: cleanNumber(user.followers_count),
    affection: cleanNumber(user.affection),
    coverUrl: normalizeImageUrl(user.cover_url),
    avatarUrl: normalizeImageUrl(user.avatars?.default?.https),
    profileUrl: FIVE_HUNDRED_PX_PROFILE_URL,
  };
}

async function get500pxPhotoPage(page: number, perPage: number) {
  const params = new URLSearchParams({
    feature: "user",
    username: FIVE_HUNDRED_PX_USERNAME,
    page: String(page),
    rpp: String(perPage),
  });

  params.append("image_size[]", "3");
  params.append("image_size[]", "2048");

  return fetch500pxJson<FiveHundredPxPhotosResponse>(
    `${FIVE_HUNDRED_PX_API_BASE}/v1/photos?${params.toString()}`,
  );
}

function map500pxPhoto(photo: FiveHundredPxPhoto): PhotoPortfolioPhoto | undefined {
  const imageUrl = imageForSize(photo, 2048) ?? firstImage(photo);

  if (!imageUrl) {
    return undefined;
  }

  const thumbnailUrl = imageForSize(photo, 3) ?? imageUrl;

  return {
    id: photo.id,
    title: cleanText(photo.name) ?? "Untitled photograph",
    description: cleanText(photo.description),
    href: photo.url ? `https://500px.com${photo.url}` : FIVE_HUNDRED_PX_PROFILE_URL,
    imageUrl,
    thumbnailUrl,
    width: cleanNumber(photo.width) ?? 1600,
    height: cleanNumber(photo.height) ?? 1067,
    takenAt: cleanText(photo.taken_at),
    createdAt: cleanText(photo.created_at),
    camera: cleanText(photo.camera),
    lens: cleanText(photo.lens),
    aperture: cleanText(photo.aperture),
    shutterSpeed: cleanText(photo.shutter_speed),
    focalLength: cleanText(photo.focal_length),
    iso: cleanText(photo.iso),
    location: cleanText(photo.location),
    rating: cleanNumber(photo.highest_rating ?? photo.rating),
    votes: cleanNumber(photo.votes_count),
    views: cleanNumber(photo.times_viewed),
  };
}

async function get500pxPhotos(maxPages = 4, perPage = 24): Promise<PhotoPortfolioPhoto[]> {
  const firstPage = await get500pxPhotoPage(1, perPage);
  const totalPages = Math.min(cleanNumber(firstPage.total_pages) ?? 1, maxPages);
  const remainingPages = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) =>
    get500pxPhotoPage(index + 2, perPage),
  );
  const pages = [firstPage, ...(await Promise.all(remainingPages))];

  return pages
    .flatMap((page) => page.photos ?? [])
    .map(map500pxPhoto)
    .filter((photo): photo is PhotoPortfolioPhoto => Boolean(photo));
}

export async function getPhotoPortfolio(): Promise<PhotoPortfolio> {
  try {
    const [profile, photos] = await Promise.all([get500pxProfile(), get500pxPhotos()]);

    return {
      profile,
      photos,
      sourceUrl: FIVE_HUNDRED_PX_PROFILE_URL,
    };
  } catch (error) {
    console.error("Failed to load 500px photos", error);

    return {
      photos: [],
      sourceUrl: FIVE_HUNDRED_PX_PROFILE_URL,
      error: "500px photo data could not be loaded right now.",
    };
  }
}
