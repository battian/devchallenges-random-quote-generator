import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import Quote from '../../components/Quote';
import RandomButton from '../../components/RandomButton';

import './styles.css';

interface AuthorParams {
  authorName: string;
}

interface IQuote {
  _id: string;
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
}

const Author: React.FC = () => {
  const [authorQuotes, setAuthorsQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { authorName } = useParams<AuthorParams>();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${authorName}`,
      );

      setAuthorsQuotes(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [authorName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNavigateBack = () => {
    history.push('/');
  };

  return (
    <main className="layout">
      <RandomButton buttonFuction={handleNavigateBack}></RandomButton>

      {loading ? (
        <div className="loader">
          <Loader type="ThreeDots" color="#f7df94" height={48} width={48} />
        </div>
      ) : (
        <>
          <h1 className="author__name">{authorName}</h1>
          <div className="author__quotes">
            {authorQuotes.map(quote => (
              <Quote key={quote._id} quoteText={quote.quoteText} />
            ))}
          </div>
        </>
      )}

      <footer>battian @ DevChallenges.io</footer>
    </main>
  );
};

export default Author;
