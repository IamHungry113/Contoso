import { Suspense } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router';
import { Pages } from './pages/router';
import ErrorBoundary from './components/errorBoundary';

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <ErrorBoundary>
          <Pages></Pages>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
