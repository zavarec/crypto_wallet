import React from 'react';
// eslint-disable-next-line import/no-absolute-path
import img from '/daily008.gif';

export default function ErrorPage(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      ErrorPage <img src={img} alt="error" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}/>
    </div>
  );
}
