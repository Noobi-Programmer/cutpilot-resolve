/**
 * Locked API & Domain Contracts for cutpilot-resolve.
 * Owned exclusively by `architect` on `main`.
 */

export type ApiErrorCode =
  | "INVALID_INPUT"
  | "RATE_LIMITED"
  | "UPSTREAM_TIMEOUT"
  | "UPSTREAM_ERROR"
  | "INTERNAL_ERROR";

export interface ApiMeta {
  latencyMs: number;
  keyIndex?: number;
}

export interface ApiErrorBody {
  code: ApiErrorCode;
  message: string;
  retryable: boolean;
}

export type ApiResponse<T> =
  | { ok: true; data: T; meta?: ApiMeta }
  | { ok: false; error: ApiErrorBody };

export type AssetCategory =
  | "01_PNG_Textures"
  | "02_Vids_GreenScreen_Lottie"
  | "03_BGM_SFX_Memes"
  | "04_VFX_Flashes_Electric";

export type HarvesterMode =
  | "iconify"
  | "openverse"
  | "myinstants"
  | "mixkit"
  | "lottie";

export type BlendMode = "Normal" | "Screen" | "Add" | "Overlay";

export interface HarvestRequest {
  mode: HarvesterMode;
  query: string;
  url?: string;
  limit: number;
  normalizeAudio: boolean;
}

export interface HarvestedAsset {
  id: string;
  category: AssetCategory;
  sourceMode: HarvesterMode;
  localPath: string;
  normalizedPath?: string;
  blendMode: BlendMode;
  durationSec?: number;
  createdAt: string;
}

export interface HarvestResult {
  assets: HarvestedAsset[];
  outputRoot: string;
}

export type TimelineTrackKind = "video" | "audio" | "vfx" | "graphic";

export interface TimelineClip {
  id: string;
  assetId: string;
  track: TimelineTrackKind;
  trackIndex: number;
  startFrame: number;
  durationFrames: number;
  blendMode: BlendMode;
  gainDb?: number;
}

export interface TimelineManifest {
  projectName: string;
  fps: 24 | 30 | 60;
  width: 1080 | 1920;
  height: 1920 | 1080;
  clips: TimelineClip[];
  createdAt: string;
}

export interface TimelineBuildRequest {
  prompt: string;
  manifest: TimelineManifest;
}

export interface TimelineBuildResult {
  timelineName: string;
  clipCount: number;
  qaWarnings: string[];
  builtAt: string;
}
