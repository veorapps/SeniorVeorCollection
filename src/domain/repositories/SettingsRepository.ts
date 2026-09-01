import type { SiteSettings } from "@/domain/models";

export interface SettingsRepository {
  getSiteSettings(): Promise<SiteSettings>;
}
