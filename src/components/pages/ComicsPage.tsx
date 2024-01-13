import { Helmet } from 'react-helmet';

import AppBanner from '../AppBanner/AppBanner';
import ComicsList from '../ComicsList/ComicsList';

function ComicsPage() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Page with list of our comics"
        />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
}

export default ComicsPage;
