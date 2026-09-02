import { AboutPage } from "@/components/about/AboutPage";
import { contentService } from "@/services";

export default async function AboutRoute() {
  const data = await contentService.getAboutPage();
  return <AboutPage data={data} />;
}
