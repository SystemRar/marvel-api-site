import './ComicsList.scss';

import { ComponentType, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService, { TransformComicType } from '../../services/MarvelService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

const setContent = (process: string, Component: ComponentType, newItemLoading: boolean) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state');
  }
};

function ComicsList() {
  const [comicsList, setComicsList] = useState<Array<TransformComicType>>([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(109);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { getAllComics, process, setProcess } = useMarvelService();

  const onComicsListLoaded = (newComicsList: Array<TransformComicType>) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  const onRequest = (baseOffset: number) => {
    setNewItemLoading(false);
    getAllComics(baseOffset)
      .then(onComicsListLoaded)
      .then(() => setProcess('confirmed'));
  };

  useEffect(() => {
    onRequest(offset);
  }, []);

  function renderItems(comicsArray: Array<TransformComicType>) {
    const comics = comicsArray.map((comic, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="comics__item" key={index}>
        <Link to={`/comics/${comic.id}`}>
          <img src={comic.thumbnail} alt={comic.title} className="comics__item-img" />
          <div className="comics__item-name">{comic.title}</div>
          <div className="comics__item-price">{comic.price}</div>
        </Link>
      </li>
    ));

    return (
      <ul className="comics__grid">
        {comics}
      </ul>
    );
  }

  return (
    <div className="comics__list">
      {setContent(process, () => renderItems(comicsList), newItemLoading)}
      <button
        type="button"
        disabled={newItemLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default ComicsList;
