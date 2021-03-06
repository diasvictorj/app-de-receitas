import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import DetalhesComidas from './pages/DetalhesComidas';
import EmProgressoBebidas from './pages/EmProgressoBebidas';
import EmProgressoComidas from './pages/EmProgressoComidas';
import Explorar from './pages/Explorar';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import ExplorarBebidasArea from './pages/ExplorarBebidasAreas';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/comidas/:id_da_receita" component={ DetalhesComidas } />
          <Route exact path="/bebidas/:id_da_receita" component={ DetalhesBebidas } />
          <Route
            exact
            path="/comidas/:id_da_receita/in-progress"
            component={ EmProgressoComidas }
          />
          <Route
            exact
            path="/bebidas/:id_da_receita/in-progress"
            component={ EmProgressoBebidas }
          />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExplorarComidasIngredientes }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarBebidasIngredientes }
          />
          <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
          <Route exact path="/explorar/bebidas/area" component={ ExplorarBebidasArea } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

/* <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
  </div> */
