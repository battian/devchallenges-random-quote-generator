import React from 'react';

import './styles.css';

interface QuoteProps {
  quoteText: string;
}

const Quote: React.FC<QuoteProps> = ({ quoteText }) => {
  return <p className="quote">{quoteText}</p>;
};

export default Quote;
