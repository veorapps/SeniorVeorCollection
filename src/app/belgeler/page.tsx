import { DocumentsPage } from "@/components/documents/DocumentsPage";
import { contentService } from "@/services";

export default async function DocumentsRoute() {
  const [data, certificates] = await Promise.all([contentService.getDocumentsPage(), contentService.getCertificates()]);
  return <DocumentsPage certificates={certificates} data={data} />;
}
