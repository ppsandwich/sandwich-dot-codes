# Sandwich Codes

AI project portfolio and editorial website with a Rugrats-inspired postmodern aesthetic. Handmade, asymmetrical, tactile, expressive.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Contentlayer for MDX content.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| UI Components | Custom + shadcn/ui primitives |
| Animation | Framer Motion 11 |
| Content | MDX via Contentlayer2 |
| Search | cmdk (local command palette) |
| Themes | next-themes (light/dark) |
| Icons | Lucide React |
| Deployment | Vercel |

## Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| `next` | ^14.2.0 | React framework |
| `react` / `react-dom` | ^18.3.0 | UI library |
| `framer-motion` | ^11.0.0 | Animations and transitions |
| `contentlayer2` | ^0.5.8 | MDX content pipeline |
| `next-contentlayer2` | ^0.5.8 | Next.js Contentlayer integration |
| `cmdk` | ^1.1.1 | Command palette / search |
| `next-themes` | ^0.3.0 | Dark mode support |
| `lucide-react` | ^0.400.0 | Icon library |
| `class-variance-authority` | ^0.7.0 | Component variant management |
| `clsx` | ^2.1.0 | Conditional classnames |
| `tailwind-merge` | ^2.3.0 | Tailwind class deduplication |
| `date-fns` | ^4.1.0 | Date formatting |
| `reading-time` | ^1.5.0 | Article reading time estimation |
| `zod` | ^4.4.3 | Schema validation |
| `rehype-slug` | ^6.0.0 | Heading IDs in MDX |
| `rehype-autolink-headings` | ^7.1.0 | Auto-link headings |
| `rehype-highlight` | ^7.0.2 | Syntax highlighting |
| `remark-gfm` | ^4.0.1 | GitHub Flavored Markdown |
| `shiki` | ^4.0.2 | Code syntax highlighting |

### Development

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^5.4.0 | Type checking |
| `tailwindcss` | ^3.4.4 | Utility-first CSS |
| `postcss` | ^8.4.38 | CSS processing |
| `autoprefixer` | ^10.4.19 | CSS vendor prefixes |
| `@types/node` | ^20.14.0 | Node.js type definitions |
| `@types/react` | ^18.3.0 | React type definitions |
| `@types/react-dom` | ^18.3.0 | React DOM type definitions |

## Getting Started

### Prerequisites

- Node.js 18.17+ (tested with v24.15.0)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/sandwich-codes/sandwich-dot-codes-1.git
cd sandwich-dot-codes-1

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional: GitHub personal access token for live repo/commit data
# Without this, the GitHub activity section shows a placeholder
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

## Project Structure

```
├── content/                    # MDX content files
│   ├── projects/               # Project write-ups
│   ├── writing/                # Blog articles
│   └── experiments/            # Experiment pages
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (fonts, providers, nav, footer)
│   │   ├── page.tsx            # Homepage
│   │   ├── not-found.tsx       # Custom 404
│   │   ├── projects/           # /projects, /projects/[slug]
│   │   ├── writing/            # /writing, /writing/[slug]
│   │   ├── experiments/        # /experiments, /experiments/[slug]
│   │   ├── about/              # /about
│   │   ├── uses/               # /uses
│   │   └── contact/            # /contact
│   ├── components/
│   │   ├── layout/             # Container, Section, BentoGrid, Navbar, Footer
│   │   ├── decorative/         # NoiseOverlay, PaperCard, WobbleCard, TapeFrame, StickerTag, DoodleAccent, etc.
│   │   ├── projects/           # ProjectCard, ExperimentCard, page content components
│   │   ├── writing/            # ArticleCard, MDXRenderer, page content components
│   │   └── ui/                 # SearchModal, ThemeToggle, Providers
│   ├── lib/
│   │   ├── config.ts           # Site config and navigation
│   │   ├── github.ts           # GitHub API fetching
│   │   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│   ├── hooks/                  # Custom React hooks
│   ├── styles/
│   │   └── globals.css         # Tailwind layers, noise overlay, paper grain, dark mode
│   └── types/
│       └── index.ts            # Project, Article, Experiment, NavItem, SiteConfig types
├── contentlayer.config.ts      # Contentlayer MDX config
├── next.config.mjs             # Next.js config (withContentlayer wrapper)
├── tailwind.config.ts          # Tailwind config (colors, fonts, shadows, animations, dark mode)
├── tsconfig.json               # TypeScript config
└── postcss.config.mjs          # PostCSS config
```

## Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero, featured projects, recent writing, GitHub activity |
| `/projects` | All projects with status filter (active/experimental/archived) |
| `/projects/[slug]` | Project detail with MDX content, tech stack, GitHub/demo links |
| `/writing` | All articles with reading time and tags |
| `/writing/[slug]` | Article detail with styled MDX, share button |
| `/experiments` | Experiment grid |
| `/experiments/[slug]` | Experiment detail with MDX content |
| `/about` | Bio and design philosophy |
| `/uses` | Hardware and software toolkit |
| `/contact` | Contact links and social profiles |

## Content System

Content is stored as MDX files in the `content/` directory. Each file has YAML frontmatter:

### Project Frontmatter

```yaml
---
title: "Project Name"
description: "Short description"
date: "2024-12-01"
tags: ["AI", "WebGL"]
featured: true
github: "https://github.com/..."
demo: "https://..."
status: "active" # active | experimental | archived
cover: "/images/projects/cover.jpg"
tech: ["Next.js", "TypeScript", "Tailwind CSS"]
---
```

### Article Frontmatter

```yaml
---
title: "Article Title"
description: "Short description"
date: "2024-12-15"
tags: ["philosophy", "creativity"]
cover: "/images/writing/cover.jpg"
featured: true
---
```

### Experiment Frontmatter

```yaml
---
title: "Experiment Name"
description: "Short description"
date: "2024-09-10"
tags: ["WebGPU", "physics"]
demo: "https://..."
github: "https://github.com/..."
---
```

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| `background` | `#F5EFE4` | Page background (warm paper) |
| `foreground` | `#292524` | Primary text |
| `mustard` | `#D6B347` | Accent, highlights, stickers |
| `teal` | `#6F9D9A` | Links, secondary accent |
| `salmon` | `#D98B73` | Experiment accent |
| `slime` | `#9FB06F` | Active status |
| `lavender` | `#B8A7CC` | Decorative |
| `sky` | `#9BB7D4` | Decorative |
| `muted` | `#7C736C` | Secondary text |
| `border` | `#463F3A` | Borders, shadows |

### Typography

- **Headings:** Fraunces (variable serif, Google Fonts)
- **Body:** Inter (sans-serif, Google Fonts)

### Decorative Components

- `NoiseOverlay` — full-page paper grain texture
- `PaperCard` — rotated card with tactile shadow
- `WobbleCard` — spring-animated hover card
- `TapeFrame` — tape strip accents
- `StickerTag` — rotated sticker badges (7 color variants)
- `DoodleAccent` — SVG doodles (star, circle, squiggle, arrow, x, dots)
- `ScribbleArrow` — directional scribble arrows
- `CrookedDivider` — zigzag/wavy/scribble SVG dividers

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open search command palette |
| `↑` / `↓` | Navigate search results |
| `Enter` | Select search result |
| `Esc` | Close search |

## Deployment

### Vercel

Push to GitHub and connect the repo in the [Vercel dashboard](https://vercel.com). Vercel auto-detects Next.js and deploys with zero config.

Optionally set `GITHUB_TOKEN` as an environment variable in Vercel for live GitHub activity data.

### Manual

```bash
npm run build
npm start
```

## License

See [LICENSE](LICENSE) for details.
