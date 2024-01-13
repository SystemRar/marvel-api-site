import { useHttp } from '../hooks/http.hook';

export type TransformCharacterType = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
  comics: Array<Record<string, string>>;
};

export type CharacterType = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: Array<Record<string, string>>;
  comics: {
    items: Array<Record<string, string>>;
  };
};

export type ComicsType = {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  textObjects: Array<Record<string, string>>;
  prices: Array<Record<string, number>>;
};

export type TransformComicType = {
  id: number;
  title: string;
  description: string;
  pageCount: number | string;
  thumbnail: string;
  language: string;
  price: number | string;
};

const useMarvelService = () => {
  const {
    request, clearError, process, setProcess,
  } = useHttp();

  const API_BASE = 'https://gateway.marvel.com:443/v1/public/';
  const API_KEY = 'apikey=b99363af23d1cc536718d6118ce17444';
  const BASE_OFFSET = 210;

  const TRANSFORM_CHARACTER = (char: CharacterType): TransformCharacterType => ({
    id: char.id,
    name: char.name,
    description: char.description
      ? `${char.description.slice(0, 210)}...`
      : 'There is no description for this character',
    thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items,
  });

  const TRANSFORM_COMICS = (comics: ComicsType): TransformComicType => ({
    id: comics.id,
    title: comics.title,
    description: comics.description || 'There is no description',
    pageCount: comics.pageCount
      ? `${comics.pageCount} p.`
      : 'No information about the number of pages',
    thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
    language: comics.textObjects[0]?.language || 'en-us',
    price: comics.prices[0].price
      ? `${comics.prices[0].price}$`
      : 'not available',
  });

  const getAllCharacters = async (offset = BASE_OFFSET) => {
    const res = await request(
      `${API_BASE}characters?limit=9&offset=${offset}&${API_KEY}`,
    );
    return res.data.results.map(TRANSFORM_CHARACTER);
  };

  const getCharacterByName = async (characterName: string) => {
    const res = await request(`${API_BASE}characters?name=${characterName}&${API_KEY}`);
    return res.data.results.map(TRANSFORM_CHARACTER);
  };

  async function getComic(comicId: number): Promise<TransformComicType> {
    const res = await request(`${API_BASE}comics/${comicId}?${API_KEY}`);
    return TRANSFORM_COMICS(res.data.results[0]);
  }

  async function getCharacter(characterId: number): Promise<TransformCharacterType> {
    const res = await request(`${API_BASE}characters/${characterId}?${API_KEY}`);
    return TRANSFORM_CHARACTER(res.data.results[0]);
  }

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${API_BASE}comics?limit=8&offset=${offset}&${API_KEY}`,
    );
    return res.data.results.map(TRANSFORM_COMICS);
  };

  return {
    clearError,
    process,
    setProcess,
    getAllCharacters,
    getCharacterByName,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
