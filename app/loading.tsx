export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-himalayan">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
