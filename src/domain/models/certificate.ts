import type { MediaAsset } from "./common";

export type CertificateDocumentType = "certificate" | "report" | "policy" | "service";

export interface Certificate {
  id: string;
  title: string;
  description: string;
  thumbnail: MediaAsset;
  documentUrl: string;
  documentType: CertificateDocumentType;
  verified: boolean;
  enabled: boolean;
  order: number;
  updatedAt: string;
}
