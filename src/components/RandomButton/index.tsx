import React from 'react';
import { Autorenew } from '@material-ui/icons';

import './styles.css';

interface RandomButtonProps {
  buttonFuction: () => void;
}

const RandomButton: React.FC<RandomButtonProps> = ({ buttonFuction }) => {
  return (
    <div className="random">
      <button className="btn" onClick={buttonFuction}>
        Random <Autorenew />
      </button>
    </div>
  );
};

export default RandomButton;
