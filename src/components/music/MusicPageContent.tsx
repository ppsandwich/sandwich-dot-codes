"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ExternalLink, Disc, Volume2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { StickerTag } from "@/components/decorative/StickerTag";
import { DoodleAccent } from "@/components/decorative/DoodleAccent";
import { TapeFrame } from "@/components/decorative/TapeFrame";
import { PaperCard } from "@/components/decorative/PaperCard";
import { CrookedDivider } from "@/components/decorative/CrookedDivider";
import { cn } from "@/lib/utils";

interface Track {
  id: string;
  title: string;
  number: string;
  duration: string;
  genre: string;
}

const ALBUM_TITLE = "Interpol";
const ALBUM_DESC = "Released April 2026. A 10-track LP of atmospheric synthesis, rhythmic industrial pulses, and electronic audio textures.";
const SOUNDCLOUD_PROFILE = "https://soundcloud.com/ppsandwich";

const TRACKS: Track[] = [
  { id: "2333668493", title: "Someday I think I'll be stars", number: "01", duration: "3:50", genre: "Ambient Electronic" },
  { id: "2333668496", title: "Stars part two", number: "02", duration: "2:33", genre: "Minimal Techno" },
  { id: "2333668472", title: "God protector's daughter", number: "03", duration: "3:59", genre: "Atmospheric Ambient" },
  { id: "2333668469", title: "Sepheryn", number: "04", duration: "3:08", genre: "Industrial Chill" },
  { id: "2333668490", title: "Mstry (Interpol mix)", number: "05", duration: "3:30", genre: "Downtempo" },
  { id: "2333668487", title: "Uh oh, this bed is a tomb", number: "06", duration: "3:48", genre: "Electronic" },
  { id: "2333668475", title: "Congratulations, track seven", number: "07", duration: "4:03", genre: "Electronic" },
  { id: "2333668481", title: "The OG Can Gal", number: "08", duration: "3:45", genre: "Electronic" },
  { id: "2333668484", title: "Planet power!", number: "09", duration: "4:53", genre: "IDM" },
  { id: "2333668478", title: "Storms", number: "10", duration: "3:49", genre: "Ambient" },
];

export function MusicPageContent() {
  const [activeTrack, setActiveTrack] = useState<Track>(TRACKS[0]);

  // Construct SoundCloud Widget URL
  const widgetUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${activeTrack.id}&color=%233f8f8b&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;

  return (
    <Section spacing="loose">
      <Container>
        {/* Header Section */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <StickerTag variant="mustard" rotation={-2} className="mb-4">
              Original Music
            </StickerTag>
            <h1 className="font-heading text-display font-black leading-[0.95] tracking-tighter rotate-[-0.3deg]">
              The Sounds
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted rotate-[0.2deg]">
              &quot;The Sounds&quot; is the name of a Swedish indie rock band I used to love in my 20s. How fitting.
            </p>
          </motion.div>
          <div className="absolute -right-2 top-4 rotate-[8deg] sm:right-4">
            <DoodleAccent variant="star" color="#D6B347" size={48} />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column: Player Deck */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TapeFrame tapePosition="top">
              <PaperCard rotation={-0.5} className="bg-background-dark text-foreground border-3 border-border p-6 shadow-tactile paper-grain dark:bg-background-dark/90">
                
                {/* Media Header */}
                <div className="flex items-center justify-between border-b-2 border-border/20 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Disc className="animate-spin-slow text-teal" size={24} style={{ animationDuration: "6s" }} />
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-teal">
                      Playback Console
                    </span>
                  </div>
                  <a
                    href={`${SOUNDCLOUD_PROFILE}/${activeTrack.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${activeTrack.id.slice(0, 1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-heading text-xs font-bold text-muted transition-colors hover:text-mustard"
                  >
                    SoundCloud <ExternalLink size={12} />
                  </a>
                </div>

                {/* Cassette / Visual Interface */}
                <div className="border-3 border-border bg-[#111] p-4 rounded mb-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[140px]">
                  
                  {/* Cassette Deco Wheels */}
                  <div className="flex gap-12 mb-4 opacity-30 select-none">
                    <div className="w-10 h-10 rounded-full border-4 border-dashed border-white animate-spin" style={{ animationDuration: "10s" }} />
                    <div className="w-10 h-10 rounded-full border-4 border-dashed border-white animate-spin" style={{ animationDuration: "10s" }} />
                  </div>

                  {/* Equalizer Waveform micro-animation */}
                  <div className="flex items-end gap-1 h-8 mb-2">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-teal"
                        initial={{ height: 2 }}
                        animate={{
                          height: [2, Math.random() * 24 + 4, 2],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: Math.random() * 0.8 + 0.6,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  {/* Cassette Label Info */}
                  <div className="text-center mt-2 z-10">
                    <span className="font-mono text-xs text-salmon font-bold uppercase tracking-wider block">
                      Track {activeTrack.number}
                    </span>
                    <h3 className="font-heading text-base font-black text-white line-clamp-1 mt-1">
                      {activeTrack.title}
                    </h3>
                    <p className="text-[10px] font-heading text-white/50 uppercase tracking-widest mt-0.5">
                      {activeTrack.genre}
                    </p>
                  </div>
                </div>

                {/* SoundCloud Widget Iframe Embed */}
                <div className="border-2 border-border/40 rounded overflow-hidden bg-background/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTrack.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={widgetUrl}
                        className="block"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </PaperCard>
            </TapeFrame>
            
            {/* Quick Profile Link */}
            <PaperCard rotation={0.4} className="border-2 border-dashed border-border/60 bg-transparent py-4 px-6 text-center">
              <p className="text-sm text-muted">
                Enjoyed these tracks? Listen to more on Dylan's SoundCloud profile at{" "}
                <a
                  href={SOUNDCLOUD_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal underline hover:text-mustard"
                >
                  soundcloud.com/ppsandwich
                </a>.
              </p>
            </PaperCard>
          </div>

          {/* Right Column: Album Sleeves & Tracklist */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <PaperCard rotation={0.2} className="bg-background border-3 border-border p-6 md:p-8 shadow-tactile paper-grain">
              
              {/* Album Header */}
              <div className="relative mb-6">
                <span className="font-mono text-xs font-bold text-salmon uppercase tracking-widest block mb-1">
                  10-Track LP
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-black text-foreground">
                  {ALBUM_TITLE}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {ALBUM_DESC}
                </p>
                <div className="absolute -top-3 -right-3 rotate-[12deg] select-none">
                  <DoodleAccent variant="circle" color="#6F9D9A" size={44} />
                </div>
              </div>

              <CrookedDivider variant="scribble" className="my-4" />

              {/* Track Table */}
              <div className="overflow-hidden border-2 border-border bg-background rounded">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border bg-foreground text-background font-heading text-xs font-bold uppercase tracking-wider">
                      <th className="py-2 px-4 w-12 text-center">#</th>
                      <th className="py-2 px-4">Title</th>
                      <th className="py-2 px-4 hidden sm:table-cell">Genre</th>
                      <th className="py-2 px-4 w-20 text-center">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRACKS.map((track) => {
                      const isActive = activeTrack.id === track.id;
                      return (
                        <tr
                          key={track.id}
                          onClick={() => setActiveTrack(track)}
                          className={cn(
                            "group cursor-pointer border-b border-border/30 last:border-none",
                            "transition-all duration-200 hover:bg-mustard/15",
                            isActive ? "bg-teal/10 font-bold" : "bg-transparent"
                          )}
                        >
                          <td className="py-3 px-4 text-center font-mono text-xs">
                            {isActive ? (
                              <Volume2 size={14} className="text-teal mx-auto animate-pulse" />
                            ) : (
                              <span className="text-muted group-hover:text-foreground">{track.number}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={cn(
                              "text-sm transition-colors",
                              isActive ? "text-teal" : "text-foreground group-hover:text-mustard"
                            )}>
                              {track.title}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-muted font-heading hidden sm:table-cell">
                            {track.genre}
                          </td>
                          <td className="py-3 px-4 text-center font-mono text-xs text-muted">
                            {track.duration}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </PaperCard>
          </div>
          
        </div>
      </Container>
    </Section>
  );
}
