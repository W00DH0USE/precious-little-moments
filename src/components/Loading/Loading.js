import React from 'react';
import Spinner from 'react-spinner-material';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <Spinner size={120} spinnerColor={"#FFF"} spinnerWidth={2} visible={true} />
    </div>
  )
}

export default Loading;