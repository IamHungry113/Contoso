import { Suspense } from 'react';
import './App.css';
import { Pages } from './pages/router';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { Fallback } from './components/errorBoundary/fallback';
import { useAuth } from './pages/useAuth';

function App() {
  useAuth();
  return (
    <Suspense>
      <ErrorBoundary fallbackRender={Fallback}>
        <Pages></Pages>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
