import { ContactPage } from "@/components/contact/ContactPage";
import { contentService } from "@/services";
export default async function ContactRoute() { const [data, settings] = await Promise.all([contentService.getContactPage(), contentService.getSiteSettings()]); return <ContactPage data={data} settings={settings} />; }
