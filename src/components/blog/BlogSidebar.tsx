import { BlogPost } from '@/lib/hashnode';
import Link from 'next/link';

interface BlogSidebarProps {
  posts: BlogPost[];
}

export default function BlogSidebar({ posts }: BlogSidebarProps) {
  const recentPosts = posts.slice(0, 5);
  const allTags = posts.flatMap(post => post.tags);
  const popularTags = Array.from(
    allTags.reduce((acc, tag) => {
      acc.set(tag.name, (acc.get(tag.name) || 0) + 1);
      return acc;
    }, new Map())
  )
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([name]) => name);

  return (
    <div className="space-y-8">
      {/* Recent Posts */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <div key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm hover:text-green-400 transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
              <time className="text-xs text-gray-500 block mt-1">
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded hover:bg-gray-700 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Blog Stats */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Blog Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Posts:</span>
            <span>{posts.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Tags:</span>
            <span>{new Set(allTags.map(tag => tag.name)).size}</span>
          </div>
        </div>
      </div>
    </div>
  );
}