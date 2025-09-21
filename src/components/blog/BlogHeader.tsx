interface BlogHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function BlogHeader({ title, description, className = '' }: BlogHeaderProps) {
  return (
    <div className={`border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-10 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-gray-400">{description}</p>
      </div>
    </div>
  );
}