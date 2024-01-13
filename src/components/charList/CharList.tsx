import './CharList.scss';

import React, {
  ComponentType, useEffect, useMemo, useRef, useState,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService, { TransformCharacterType } from '../../services/MarvelService';
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

type OnCharSelectedType = {
  (id: number): void;
};

function CharList({ onCharSelected }: { onCharSelected: OnCharSelectedType }) {
  const [charList, setCharList] = useState<Array<TransformCharacterType>>([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(109);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();
  const onCharListLoaded = async (newCharList: Array<TransformCharacterType>) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList([...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset + 9);
    setCharEnded(ended);
  };

  const onRequest = (baseOffset: number) => {
    setNewItemLoading(false);
    getAllCharacters(baseOffset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'));
  };

  useEffect(() => {
    onRequest(offset);
  }, []);

  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const focusOnItem = (id: number) => {
    itemRefs.current.forEach((item) => {
      if (item) {
        item.classList.remove('char__item_selected');
      }
    });

    const currentItem = itemRefs.current[id];
    if (currentItem) {
      currentItem.classList.add('char__item_selected');
      currentItem.focus();
    }
  };

  const renderItems = (charactersArray: Array<TransformCharacterType>) => {
    const characters = charactersArray.map((character, index) => {
      let imgStyle: React.CSSProperties = { objectFit: 'cover' };
      if (character.thumbnail === 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <CSSTransition key={character.id} timeout={500} classNames="char__item">
          <div
            role="button"
            className="char__item"
            tabIndex={0}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => {
              onCharSelected(character.id);
              focusOnItem(index);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                onCharSelected(character.id);
                focusOnItem(index);
              }
            }}
          >
            <img src={character.thumbnail} alt={character.name} style={imgStyle} />
            <div className="char__name">{character.name}</div>
          </div>
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>
          {characters}
        </TransitionGroup>
      </ul>
    );
  };

  const getContent = () => setContent(process, () => renderItems(charList), newItemLoading);

  const elements = useMemo(getContent, [process]);

  return (
    <div className="char__list">
      {elements}
      <button
        type="button"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default CharList;
