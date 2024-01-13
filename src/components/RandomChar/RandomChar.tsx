import './RandomChar.scss';

import { CSSProperties, useEffect, useState } from 'react';

import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService, { TransformCharacterType } from '../../services/MarvelService';
import setContent from '../../utils/setContent';

type ViewDataPropsType = {
  data: Record<string, string>;
};

function View({ data }: ViewDataPropsType) {
  const { name, description, thumbnail } = data;
  let imgStyle: CSSProperties = { objectFit: 'cover' };
  if (thumbnail === 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { objectFit: 'contain' };
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description}
        </p>
      </div>
    </div>
  );
}

function RandomChar() {
  const [char, setChar] = useState<TransformCharacterType | null>(null);
  const {
    getCharacter, clearError, process, setProcess,
  } = useMarvelService();

  const onCharLoaded = (charInfo: TransformCharacterType) => {
    setChar(charInfo);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button type="button" onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
}

export default RandomChar;
