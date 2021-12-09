import React, { Component } from 'react';
import { useState } from 'react';
import context from './Mycontext';

function Provider({ children }) {
  const [API_RESULTS, setData] = useState({meals:[]});
  const contextValue = {
    API_RESULTS,
    setData,
  };
  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

export default Provider;
