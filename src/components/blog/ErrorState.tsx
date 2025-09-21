interface ErrorStateProps {
  message: string;
  title?: string;
}

export default function ErrorState({ message, title = "Error Loading Blog" }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-black text-green-500 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}