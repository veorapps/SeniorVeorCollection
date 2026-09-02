import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/BlogPages";
import { contentService } from "@/services";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await contentService.getBlogPostBySlug(slug);
  if (!post) notFound();
  const relatedPosts = (await contentService.getBlogPosts()).filter((item) => item.id !== post.id).slice(0, 3);
  return <BlogArticlePage post={post} relatedPosts={relatedPosts} />;
}
