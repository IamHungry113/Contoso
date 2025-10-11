import { Suspense } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router';
import { Pages } from './pages/router';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { Fallback } from './components/errorBoundary/fallback';
import { useAuth } from './pages/useAuth';

function App() {
  useAuth();
  return (
    <Suspense>
      <BrowserRouter>
        <ErrorBoundary fallbackRender={Fallback}>
          <Pages></Pages>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
