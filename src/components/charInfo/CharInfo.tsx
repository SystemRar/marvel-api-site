import './CharInfo.scss';

import React, { useEffect, useState } from 'react';

import useMarvelService, { TransformCharacterType } from '../../services/MarvelService';
import setContent from '../../utils/setContent';

type ViewDataPropsType = {
  data: {
    name: string;
    description: string;
    thumbnail: string;
    comics: Array<Record<string, string>>;
  };
};

function View(props: ViewDataPropsType) {
  const { data } = props;

  if (!data) {
    return null;
  }

  const {
    name, description, thumbnail, comics,
  } = data;

  let imgStyle: React.CSSProperties = { objectFit: 'cover' };
  if (thumbnail === 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { objectFit: 'contain' };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics!.length > 0 ? null : 'There is no comics with this character'}
        {
                    comics!.map((comic, index) => {
                      if (index > 9) return null;
                      return (
                        <li key={comic.name} className="char__comics-item">
                          {comic.name}
                        </li>
                      );
                    })
                }
      </ul>
    </>
  );
}

function CharInfo({ charId }: { charId: number }) {
  const [char, setChar] = useState<TransformCharacterType | null>(null);

  const {
    getCharacter, clearError, process, setProcess,
  } = useMarvelService();

  const onCharLoaded = (charInfo: TransformCharacterType) => {
    setChar(charInfo);
  };

  const updateChar = () => {
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  useEffect(() => {
    updateChar();
  }, [charId]);

  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
}

export default CharInfo;
