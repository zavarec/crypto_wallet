import { Button } from '@chakra-ui/button';
import React, { useState } from 'react';

function NumberComponent(): JSX.Element {
  const [numberVisible, setNumberVisible] = useState(true);

  const handleClick = (): void => {
    setNumberVisible((prev) => !prev);
  };

  return (
    <div style={{border: '1px solid gold'}}>
      <Button style={{ color: 'white', paddingLeft: '5px'}} onClick={handleClick}>{numberVisible ? 'Hide balance' : 'Show balance'}</Button>
      {numberVisible ? (
        <p style={{ color: 'white',paddingLeft: '5px', fontSize: '20px'}}>1023.47$</p>
      ) : (
        <p style={{ color: 'white',paddingLeft: '5px' }}>*******</p>
      )}
      
    </div>
  );
}

export default NumberComponent;
