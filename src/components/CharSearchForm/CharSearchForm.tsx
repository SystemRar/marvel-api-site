import './CharSearchForm.scss';

import {
  ErrorMessage as FormikErrorMessage, Field, Form, Formik,
} from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import useMarvelService, { TransformCharacterType } from '../../services/MarvelService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function CharSearchForm() {
  const [char, setChar] = useState<Array<TransformCharacterType> | null>(null);
  const {
    getCharacterByName, clearError, process, setProcess,
  } = useMarvelService();

  const onCharLoaded = (foundChar: Array<TransformCharacterType>) => {
    setChar(foundChar);
  };

  const updateChar = (name: string) => {
    clearError();

    getCharacterByName(name)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const errorMessage = process === 'error'
    ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

  let results = null;

  if (char) {
    if (char.length > 0) {
      results = (
        <div className="char__search-wrapper">
          <div className="char__search-success">
            There is! Visit
            {char[0].name}
            {' '}
            page?
          </div>
          <Link to={`/characters/${char[0].id}`} className="button button__secondary">
            <div className="inner">To page</div>
          </Link>
        </div>
      );
    } else {
      results = (
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      );
    }
  }

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: '',
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required('This field is required'),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              type="submit"
              className="button button__main"
              disabled={process === 'loading'}
            >
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage component="div" className="char__search-error" name="charName" />
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
}

export default CharSearchForm;
