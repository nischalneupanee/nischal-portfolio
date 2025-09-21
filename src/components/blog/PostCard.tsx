import { BlogPost } from '@/lib/hashnode';
import Link from 'next/link';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-colors">
      <div className="flex gap-4">
        {post.coverImage && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={post.coverImage.url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 hover:text-green-400 transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-gray-400 mb-3 line-clamp-2">{post.brief}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
            <span>{post.readTimeInMinutes} min read</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
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
      </div>
    </article>
  );
}