import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Eye, Heart, MapPin, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";
import { StickerTag } from "@/components/decorative/StickerTag";
import type { PhotoPortfolio, PhotoPortfolioPhoto } from "@/lib/photos";

interface PhotosPageContentProps {
  portfolio: PhotoPortfolio;
}

function formatCount(value?: number) {
  if (typeof value !== "number") {
    return "0";
  }

  return new Intl.NumberFormat("en-AU").format(value);
}

function formatPhotoDate(photo: PhotoPortfolioPhoto) {
  const dateValue = photo.takenAt ?? photo.createdAt;

  if (!dateValue) {
    return undefined;
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-AU", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function cameraLine(photo: PhotoPortfolioPhoto) {
  return [photo.camera, photo.lens].filter(Boolean).join(" / ");
}

function exposureLine(photo: PhotoPortfolioPhoto) {
  return [photo.focalLength, photo.aperture, photo.shutterSpeed, photo.iso ? `ISO ${photo.iso}` : undefined]
    .filter(Boolean)
    .join(" · ");
}

export function PhotosPageContent({ portfolio }: PhotosPageContentProps) {
  const { profile, photos, sourceUrl, error } = portfolio;
  const heroPhoto = photos[0];
  const heroImage = profile?.coverUrl ?? heroPhoto?.imageUrl;

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-end">
            <div className="relative z-10">
              <StickerTag variant="teal" rotation={-2} className="mb-5">
                500px Portfolio
              </StickerTag>

              <h1 className="font-heading text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                Photos
              </h1>

              <CrookedDivider variant="scribble" color="#6F9D9A" className="my-6 max-w-xl" />

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                A living portfolio of photographs by {profile?.name ?? "Dylan Gibbs"}, pulled from
                the public 500px profile at render time and cached for fast page loads.
              </p>

              {profile?.bio ? (
                <p className="mt-5 max-w-2xl border-l-4 border-teal pl-4 text-base italic text-foreground">
                  {profile.bio}
                </p>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-3 border-border bg-foreground px-4 py-2 font-heading text-sm font-bold uppercase tracking-wider text-background shadow-tactile transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-tactile-lg"
                >
                  View on 500px
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="#photo-grid"
                  className="inline-flex items-center gap-2 border-3 border-border bg-mustard px-4 py-2 font-heading text-sm font-bold uppercase tracking-wider text-foreground shadow-tactile transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-tactile-lg"
                >
                  Browse the set
                </Link>
              </div>
            </div>

            <div className="relative min-h-[360px] rotate-[1deg] overflow-hidden border-3 border-border bg-foreground shadow-tactile-lg sm:min-h-[460px]">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={heroPhoto?.title ?? "Photo portfolio cover image"}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[360px] items-center justify-center bg-teal/20 p-10 text-center font-heading text-3xl font-black">
                  500px images loading
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 to-transparent p-5 text-background">
                <p className="font-heading text-2xl font-black">{heroPhoto?.title ?? "Silent Soar"}</p>
                {heroPhoto?.location ? (
                  <p className="mt-1 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {heroPhoto.location}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-3 border-border bg-background p-4 shadow-tactile paper-grain dark:bg-background-dark">
              <p className="font-heading text-3xl font-black">{formatCount(profile?.photoCount ?? photos.length)}</p>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Photos on 500px</p>
            </div>
            <div className="border-3 border-border bg-background p-4 shadow-tactile paper-grain dark:bg-background-dark">
              <p className="flex items-center gap-2 font-heading text-3xl font-black">
                <Heart className="h-6 w-6 text-salmon" aria-hidden="true" />
                {formatCount(profile?.affection)}
              </p>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Affection</p>
            </div>
            <div className="border-3 border-border bg-background p-4 shadow-tactile paper-grain dark:bg-background-dark">
              <p className="flex items-center gap-2 font-heading text-3xl font-black">
                <Users className="h-6 w-6 text-teal" aria-hidden="true" />
                {formatCount(profile?.followerCount)}
              </p>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Followers</p>
            </div>
            <div className="border-3 border-border bg-background p-4 shadow-tactile paper-grain dark:bg-background-dark">
              <p className="font-heading text-3xl font-black">{profile?.location ?? "Melbourne"}</p>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Base</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="photo-grid" className="pb-20">
        <Container size="wide">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <StickerTag variant="mustard" rotation={2} className="mb-4">
                Latest Pull
              </StickerTag>
              <h2 className="font-heading text-4xl font-black sm:text-5xl">The Wall</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Images and metadata are scraped from the public 500px API and revalidated every 12 hours.
            </p>
          </div>

          {error ? (
            <div className="border-3 border-border bg-salmon/20 p-6 shadow-tactile paper-grain">
              <p className="font-heading text-2xl font-black">500px is not responding right now.</p>
              <p className="mt-2 text-muted-foreground">{error}</p>
              <a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex font-bold underline">
                Open the profile directly
              </a>
            </div>
          ) : null}

          {photos.length > 0 ? (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
              {photos.map((photo, index) => {
                const date = formatPhotoDate(photo);
                const camera = cameraLine(photo);
                const exposure = exposureLine(photo);
                const rotation = [-0.6, 0.4, 0.8, -0.3][index % 4];

                return (
                  <article
                    key={photo.id}
                    className="mb-5 break-inside-avoid overflow-hidden border-3 border-border bg-background shadow-tactile paper-grain transition-all hover:rotate-0 hover:shadow-tactile-lg dark:bg-background-dark"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <a href={photo.href} target="_blank" rel="noreferrer" className="group block">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        width={photo.width}
                        height={photo.height}
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-auto w-full border-b-3 border-border object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </a>

                    <div className="space-y-3 p-4">
                      <div>
                        <h3 className="font-heading text-xl font-black leading-tight">{photo.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {[photo.location, date].filter(Boolean).join(" / ")}
                        </p>
                      </div>

                      {photo.description ? (
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {photo.description}
                        </p>
                      ) : null}

                      {camera || exposure ? (
                        <div className="border-t-2 border-border pt-3 text-xs uppercase tracking-wide text-muted-foreground">
                          {camera ? <p className="font-bold text-foreground">{camera}</p> : null}
                          {exposure ? <p className="mt-1">{exposure}</p> : null}
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between border-t-2 border-border pt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          {formatCount(photo.views)}
                        </span>
                        {typeof photo.rating === "number" ? <span>{photo.rating.toFixed(1)}</span> : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : !error ? (
            <div className="border-3 border-border bg-background p-6 shadow-tactile paper-grain dark:bg-background-dark">
              No photos were returned from 500px. Visit{" "}
              <a href={sourceUrl} target="_blank" rel="noreferrer" className="font-bold underline">
                the profile
              </a>{" "}
              directly.
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
