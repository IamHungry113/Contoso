type FallbackProps = {
  error?: Error;
  resetErrorBoundary?: () => void;
};

export function Fallback({ error }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">{'Something Went Wrong'}</h1>
      <p className="text-xl mb-4">{'We are experiencing technical difficulties.'}</p>
      {error?.message && <pre>{error?.message}</pre>}
      <div className="gap-4 flex items-end">
        <button
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors mt-4"
          onClick={() => (window.location.href = '/')}
        >
          {'go back '}
        </button>
      </div>
    </div>
  );
}
