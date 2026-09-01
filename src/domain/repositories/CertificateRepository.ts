import type { Certificate } from "@/domain/models";

export interface CertificateRepository {
  getAll(): Promise<Certificate[]>;
}
