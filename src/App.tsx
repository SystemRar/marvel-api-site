import './styles/style.scss';

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from './components/AppHeader/AppHeader';
import Spinner from './components/Spinner/Spinner';

const Page404 = lazy(() => import('./components/Pages/404'));
const MainPage = lazy(() => import('./components/Pages/MainPage'));
const ComicsPage = lazy(() => import('./components/Pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('./components/Pages/SingleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('./components/Pages/SingleCharacterLayout/SingleCharacterLayoutType'));
const SinglePage = lazy(() => import('./components/Pages/SinglePage'));

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={<SinglePage Component={!SingleComicLayout} dataType="comic" />}
              />
              <Route
                path="/characters/:id"
                element={<SinglePage Component={!SingleCharacterLayout} dataType="character" />}
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
