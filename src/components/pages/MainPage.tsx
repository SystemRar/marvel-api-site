import { useState } from 'react';
import { Helmet } from 'react-helmet';

import decoration from '../../resources/img/vision.png';
import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import CharSearchForm from '../CharSearchForm/CharSearchForm';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import RandomChar from '../RandomChar/RandomChar';

function MainPage() {
  const [selectedChar, setChar] = useState<number>(0);

  const onCharSelected = (id: number) => {
    setChar(id);
  };
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Marvel information portal"
        />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className="infoAndSearchChar">
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
}

export default MainPage;
