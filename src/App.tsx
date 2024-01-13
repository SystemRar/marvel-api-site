import './styles/style.scss';

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from './components/AppHeader/AppHeader';
import Spinner from './components/Spinner/Spinner';

const Page404 = lazy(() => import('./components/pages/404'));
const MainPage = lazy(() => import('./components/pages/MainPage'));
const ComicsPage = lazy(() => import('./components/pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('./components/pages/SingleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('./components/pages/SingleCharacterLayout/SingleCharacterLayoutType'));
const SinglePage = lazy(() => import('./components/pages/SinglePage'));

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
                                // @ts-ignore
                element={<SinglePage Component={SingleComicLayout} dataType="comic" />}
              />
              <Route
                path="/characters/:id"
                                // @ts-ignore
                element={<SinglePage Component={SingleCharacterLayout} dataType="character" />}
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
