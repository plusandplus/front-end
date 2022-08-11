import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes/routes';

import './App.css';

function App(): JSX.Element {
  const ROUTES_ARR = Object.values(ROUTES);

  return (
    <Routes>
      {ROUTES_ARR.map((el, index) => {
        return (
          <Route path={el.path} element={<el.component />} key={index}></Route>
        );
      })}
    </Routes>
  );
}

export default App;
