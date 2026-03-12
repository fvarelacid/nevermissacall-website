# NeverMissACall — AI Receptionist Landing Page

## Project goal
Landing page for an AI voice receptionist product targeting aesthetic clinics.
Built to validate the product concept and capture leads before a live ElevenLabs agent demo.

## Commands
```bash
npm install      # install deps
npm run dev      # dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v3
- Framer Motion (animations)
- Lucide React (icons)

## Key architecture
- `src/app/page.tsx` — top-level page, holds `useModal` state
- `src/hooks/ui/useModal.ts` — modal flow state machine (closed → form → demo)
- `src/lib/elevenlabs.ts` — ElevenLabs integration surface (stub + real implementation pattern)
- `src/app/api/elevenlabs/signed-url/route.ts` — server route (keeps API key secret)

## ElevenLabs integration
1. Set env vars in `.env.local` (see `.env.example`)
2. `npm install @11labs/client`
3. Replace the stub in `src/lib/elevenlabs.ts` with the real SDK call (instructions inside the file)

## Lead form flow
CTA → Modal opens → LeadForm captures name/email/phone → submitLead() → VoiceDemo with firstName

## To customize
- Calendly link: `src/components/sections/BookMeeting.tsx` → `CALENDLY_LINK`
- ROI calculator cost: `src/components/sections/RoiCalculator.tsx` → `AGENT_MONTHLY_COST`
- Copy/content: each section in `src/components/sections/`
