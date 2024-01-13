import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Skeleton from '../components/Skeleton/Skeleton';
import Spinner from '../components/Spinner/Spinner';

const setContent = (process: string, Component, data) => {
  switch (process) {
    case 'waiting':
      return <Skeleton />;
    case 'loading':
      return <Spinner />;
    case 'confirmed':
      return <Component data={data} />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state');
  }
};

export default setContent;
