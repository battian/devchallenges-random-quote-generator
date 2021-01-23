import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRightAlt } from '@material-ui/icons';
import Loader from 'react-loader-spinner';

import Quote from '../../components/Quote';
import RandomButton from '../../components/RandomButton';

import './styles.css';

interface IQuote {
  _id: string;
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
}

const Home = () => {
  const [data, setData] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const { data } = await axios.get(
      'https://quote-garden.herokuapp.com/api/v3/quotes/random',
    );

    setData(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="layout">
      <RandomButton buttonFuction={fetchData}></RandomButton>

      {loading ? (
        <div className="loader">
          <Loader type="ThreeDots" color="#f7df94" height={48} width={48} />
        </div>
      ) : (
        <>
          {data.map(quote => (
            <div key={quote._id} className="random-quote">
              <Quote quoteText={quote.quoteText} />

              <Link to={`/authors/${quote.quoteAuthor}`} className="random-quote__link">
                <div>
                  <p className="random-quote__author">{quote.quoteAuthor} </p>
                  <p className="random-quote__genre">{quote.quoteGenre}</p>
                </div>

                <ArrowRightAlt />
              </Link>
            </div>
          ))}
        </>
      )}

      <footer>battian @ DevChallenges.io</footer>
    </main>
  );
};

export default Home;
