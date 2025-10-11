import { Outlet, useMatches } from 'react-router-dom';
import { ErrorBoundary } from '../components/errorBoundary/errorBoundary';
import { Fallback } from '../components/errorBoundary/fallback';

export const RootLayout = () => {
  const matches = useMatches();
  const currentTitle = matches.reverse().find((match) => match.handle?.title)?.handle?.title;

  return (
    <div className="flex h-full flex-col">
      {!!currentTitle && (
        <header className="text-xl text-black p-2 border-b bg-gray-50 font-semibold">
          {currentTitle}
        </header>
      )}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="mx-auto h-full">
          <ErrorBoundary FallbackComponent={Fallback}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};
