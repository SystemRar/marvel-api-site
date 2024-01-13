import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService, { TransformCharacterType, TransformComicType } from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from '../AppBanner/AppBanner';

type SinglePagePropsType = {
  Component: ReactNode;
  dataType: string;
};

function SinglePage({ Component, dataType }: SinglePagePropsType) {
  const { id } = useParams();
  const [data, setData] = useState<TransformComicType | TransformCharacterType | null>(null);
  const {
    getComic, getCharacter, clearError, process, setProcess,
  } = useMarvelService();

  const onDataLoaded = (loadedData: TransformComicType | TransformCharacterType) => {
    setData(loadedData);
  };

  const updateData = () => {
    clearError();
    const numericId = Number(id);

    if (!Number.isNaN(numericId)) {
      switch (dataType) {
        case 'comic':
          getComic(numericId).then(onDataLoaded).then(() => setProcess('confirmed'));
          break;
        case 'character':
          getCharacter(numericId).then(onDataLoaded).then(() => setProcess('confirmed'));
          break;
        default:
      }
    }
  };

  useEffect(() => {
    updateData();
  }, [id]);

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
}

export default SinglePage;
