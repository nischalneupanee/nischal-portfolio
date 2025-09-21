export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-black text-green-500 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-lg">Loading blog posts...</p>
          </div>
        </div>
      </div>
    </div>
  );
}