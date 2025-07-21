// ✅ blog/page.jsx (async server component)
import { getAllPosts } from '@/lib/server/blog';
import BlogListClient from './BlogListClient';
import Navbar from '@/components/sections/Navbar';

export const metadata = {
  title: 'Blog | Gautam Joshi',
  description: 'Latest articles on SEO, digital marketing, and technology trends.',
};

export default async function BlogPage() {
  const posts = getAllPosts(); // ✅ runs only on the server
  return (
    <>
      <Navbar />
      <BlogListClient posts={posts} /> {/* ✅ a client component */}
    </>
  );
}
