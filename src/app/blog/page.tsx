import { BlogListingPage } from "@/components/blog/BlogPages";
import { contentService } from "@/services";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const query = await searchParams;
  const category = typeof query.category === "string" ? query.category : undefined;
  const [data, categories, featuredPost, posts] = await Promise.all([contentService.getBlogPage(), contentService.getBlogCategories(), contentService.getFeaturedBlogPost(), contentService.getBlogPosts(category)]);
  const activeCategory = categories.some((item) => item.slug === category) ? category : undefined;
  return <BlogListingPage activeCategory={activeCategory} categories={categories} data={data} featuredPost={featuredPost} posts={posts} />;
}
