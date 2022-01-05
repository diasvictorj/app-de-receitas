import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './Mycontext';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [inProgess, setInProgress] = useState([]);
  const contextValue = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    redirect,
    setRedirect,
    inProgess,
    setInProgress,
  };
  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf([
    PropTypes.element,
    PropTypes.symbol,
  ]).isRequired,
};

export default Provider;
