import React from 'react';

const IconDefs = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
      <symbol id="stopwatch" viewBox="0 0 24 24">
        <title>Stopwatch</title>
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
      </symbol>
      <symbol id="hourglass" viewBox="0 0 24 24">
        <title>Hourglass</title>
        <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>
        <path d="M0 0h24v24H0V0z" fill="none"/>
      </symbol>
    </svg>
  );
};

export default IconDefs;
