# cutpilot-resolve — Architecture Specification (`Phase 1 Contract Lock`)

## 1. Overview & Stack
- **Goal:** Autonomous NLE asset harvesting, FFmpeg normalization, and DaVinci Resolve timeline assembly.
- **Asset Categories (`AssetCategory`):**
  - `01_PNG_Textures` — SVG/PNG cutouts, stickers, textures
  - `02_Vids_GreenScreen_Lottie` — 1080p CFR stock video, green-screen ProRes4444 alpha, Lottie `.json`
  - `03_BGM_SFX_Memes` — `-14 LUFS` 48kHz stereo WAV audio
  - `04_VFX_Flashes_Electric` — `Screen`/`Add` or `colorkey` alpha VFX overlays
- **References:** See `plans/asset-sources.md` and `scripts/asset_harvester.py`.

## 2. API & Service Contracts (`src/types/contracts.ts`)
| Endpoint / Module | Input | Output (`ApiResponse<T>`) |
| --- | --- | --- |
| `/api/assets/harvest` | `HarvestRequest` | `ApiResponse<HarvestResult>` |
| `/api/timeline/plan` | `{ prompt: string }` (via `geminiPool.ts`) | `ApiResponse<TimelineManifest>` |
| `/api/timeline/build` | `TimelineBuildRequest` | `ApiResponse<TimelineBuildResult>` |

## 3. Resilience & Security Rules
- External HTTP & Gemini calls use `AbortController` (`<= 15000ms`) and `geminiPool.ts` for `429` failover.
- Zero `any` types, zero hardcoded credentials, and `BOT_CHECK_DETECTED` stops browser automation immediately without bypassing.

## 4. Parallel Worktree Ownership
- `backend-voice` (`feat/backend`): `src/app/api/*`, `src/lib/*`
- `frontend-ui` (`feat/frontend`): `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/*`
