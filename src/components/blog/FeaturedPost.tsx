import { BlogPost } from '@/lib/hashnode';
import Link from 'next/link';

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-green-500 transition-colors">
      {post.coverImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage.url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 hover:text-green-400 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{post.brief}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          <span>{post.readTimeInMinutes} min read</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}